/**
 * 价值观游戏状态管理 (Zustand)
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { valuesApi } from '../api/valuesApi'
import type { ValueGameState, ValueInfo } from '../types/values'

interface ValueStoreActions {
  startGame: () => Promise<void>
  selectValues: (values: string[]) => Promise<void>
  loadNextComparison: () => Promise<void>
  submitChoice: (winner: 'value_a' | 'value_b') => Promise<void>
  loadSummary: () => Promise<void>
  reset: () => void
}

const initialState: ValueGameState = {
  status: 'idle',
  gameId: null,
  availableValues: [],
  selectedValues: [],
  currentComparison: null,
  summary: null,
  isLoading: false,
  error: null
}

export const useValueStore = create<ValueGameState & ValueStoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      startGame: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await valuesApi.startGame()
          set({
            gameId: response.game_id,
            availableValues: response.values,
            status: 'selecting',
            isLoading: false
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.detail || 'Failed to start game',
            isLoading: false
          })
        }
      },

      selectValues: async (valueIds: string[]) => {
        const { gameId } = get()
        if (!gameId) return

        set({ isLoading: true, error: null })
        try {
          const response = await valuesApi.selectValues(gameId, valueIds)
          set({
            selectedValues: response.selected_values,
            status: 'comparing',
            isLoading: false
          })
          // 自动加载第一个比较
          await get().loadNextComparison()
        } catch (error: any) {
          set({
            error: error.response?.data?.detail || 'Failed to select values',
            isLoading: false
          })
        }
      },

      loadNextComparison: async () => {
        const { gameId } = get()
        if (!gameId) return

        set({ isLoading: true, error: null })
        try {
          const response = await valuesApi.getNextComparison(gameId)
          set({
            currentComparison: response,
            isLoading: false
          })
        } catch (error: any) {
          // 如果没有更多比较，进入总结页面
          if (error.response?.status === 400) {
            set({ status: 'summary', isLoading: false })
            await get().loadSummary()
          } else {
            set({
              error: error.response?.data?.detail || 'Failed to load comparison',
              isLoading: false
            })
          }
        }
      },

      submitChoice: async (winner: 'value_a' | 'value_b') => {
        const { gameId } = get()
        if (!gameId) return

        set({ isLoading: true, error: null })
        try {
          const response = await valuesApi.submitChoice(gameId, winner)

          // 根据返回的action决定下一步
          if (response.action === 'challenge') {
            // 返回了挑战案例，更新当前比较状态
            const currentComp = get().currentComparison
            if (currentComp) {
              set({
                currentComparison: {
                  ...currentComp,
                  case: response.case || null,
                  stage: response.stage as 'first_challenge' | 'second_challenge',
                  // 保留initial_choice（如果有的话）
                  initial_choice: response.stage === 'first_challenge' ? winner : currentComp.initial_choice
                },
                isLoading: false
              })
            }
          } else if (response.action === 'next_comparison') {
            // 进入下一对比较
            await get().loadNextComparison()
          } else if (response.action === 'complete') {
            // 所有比较完成，进入总结页面
            set({ status: 'summary', isLoading: false })
            await get().loadSummary()
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.detail || 'Failed to submit choice',
            isLoading: false
          })
        }
      },

      loadSummary: async () => {
        const { gameId } = get()
        if (!gameId) return

        set({ isLoading: true, error: null })
        try {
          const response = await valuesApi.getSummary(gameId)
          set({
            summary: response,
            status: 'summary',
            isLoading: false
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.detail || 'Failed to load summary',
            isLoading: false
          })
        }
      },

      reset: () => {
        set(initialState)
      }
    }),
    {
      name: 'value-sim-values',
      // isLoading/error 是瞬时态，不应跨刷新保留
      partialize: (s) => ({
        status: s.status,
        gameId: s.gameId,
        availableValues: s.availableValues,
        selectedValues: s.selectedValues,
        currentComparison: s.currentComparison,
        summary: s.summary
      })
    }
  )
)
