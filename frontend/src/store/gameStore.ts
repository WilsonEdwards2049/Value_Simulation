import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppStatus, GameState, Scenario, ChoiceResponse, SummaryResponse } from '../types/game';
import { gameApi } from '../api/gameApi';

interface GameStore {
  appStatus: AppStatus;
  gameId: string | null;
  gameState: GameState | null;
  currentScenario: Scenario | null;
  lastChoiceResponse: ChoiceResponse | null;
  summary: SummaryResponse | null;
  isLoading: boolean;
  error: string | null;

  startGame: (identity: string) => Promise<void>;
  loadScenario: () => Promise<void>;
  submitChoice: (choiceId: string) => Promise<void>;
  loadSummary: () => Promise<void>;
  dismissFeedback: () => Promise<void>;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      appStatus: 'identity_select',
      gameId: null,
      gameState: null,
      currentScenario: null,
      lastChoiceResponse: null,
      summary: null,
      isLoading: false,
      error: null,

      startGame: async (identity: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await gameApi.startGame(identity);
          const { game_id, state } = res.data;
          set({ gameId: game_id, gameState: state, isLoading: false });
          await get().loadScenario();
          set({ appStatus: 'playing' });
        } catch (e: unknown) {
          set({ error: String(e), isLoading: false });
        }
      },

      loadScenario: async () => {
        const { gameId } = get();
        if (!gameId) return;
        set({ isLoading: true, error: null });
        try {
          const res = await gameApi.getScenario(gameId);
          set({ currentScenario: res.data, isLoading: false });
        } catch (e: unknown) {
          set({ error: String(e), isLoading: false });
        }
      },

      submitChoice: async (choiceId: string) => {
        const { gameId } = get();
        if (!gameId) return;
        set({ isLoading: true, error: null });
        try {
          const res = await gameApi.submitChoice(gameId, choiceId);
          set({
            gameState: res.data.state,
            lastChoiceResponse: res.data,
            isLoading: false,
            appStatus: 'feedback',
          });
        } catch (e: unknown) {
          set({ error: String(e), isLoading: false });
        }
      },

      loadSummary: async () => {
        const { gameId } = get();
        if (!gameId) return;
        set({ isLoading: true, error: null });
        try {
          const res = await gameApi.getSummary(gameId);
          set({ summary: res.data, appStatus: 'summary', isLoading: false });
        } catch (e: unknown) {
          set({ error: String(e), isLoading: false });
        }
      },

      dismissFeedback: async () => {
        const { gameState } = get();
        if (!gameState) return;
        if (gameState.status === 'ended') {
          await get().loadSummary();
        } else {
          await get().loadScenario();
          set({ appStatus: 'playing' });
        }
      },

      resetGame: () => {
        set({
          appStatus: 'identity_select',
          gameId: null,
          gameState: null,
          currentScenario: null,
          lastChoiceResponse: null,
          summary: null,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'value-sim-game',
      // isLoading/error 是瞬时态，不应跨刷新保留
      partialize: (s) => ({
        appStatus: s.appStatus,
        gameId: s.gameId,
        gameState: s.gameState,
        currentScenario: s.currentScenario,
        lastChoiceResponse: s.lastChoiceResponse,
        summary: s.summary,
      }),
    }
  )
);
