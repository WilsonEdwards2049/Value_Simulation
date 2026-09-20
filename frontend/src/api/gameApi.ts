import type { GameState, Scenario, ChoiceResponse, SummaryResponse } from '../types/game';
import {
  createGameSession,
  getScenario,
  submitGameChoice,
  getGameSummary,
} from '../engine/gameFlow';
import { ApiError } from '../engine/errors';
import { putGameSession, getGameSession, save } from '../sessionRegistry';

function requireSession(gameId: string) {
  const session = getGameSession(gameId);
  if (!session) throw new ApiError(404, 'Game not found');
  return session;
}

/** 保持与原 axios 客户端一致的 { data } 返回形状，调用方无需改动。 */
export const gameApi = {
  async startGame(identity: string): Promise<{ data: { game_id: string; state: GameState; message: string } }> {
    const { session, response } = createGameSession(identity);
    putGameSession(response.game_id, session);
    return { data: response };
  },

  async getState(gameId: string): Promise<{ data: GameState }> {
    return { data: requireSession(gameId).state };
  },

  async getScenario(gameId: string): Promise<{ data: Scenario }> {
    const session = requireSession(gameId);
    const scenario = getScenario(session);
    save();
    return { data: scenario };
  },

  async submitChoice(gameId: string, choiceId: string): Promise<{ data: ChoiceResponse }> {
    const session = requireSession(gameId);
    const result = submitGameChoice(session, choiceId);
    save();
    return { data: result };
  },

  async getSummary(gameId: string): Promise<{ data: SummaryResponse }> {
    return { data: getGameSummary(requireSession(gameId)) };
  },
};
