/**
 * 价值观游戏本地引擎门面（原为 HTTP 客户端，现已无后端）
 */
import type {
  StartValueGameResponse,
  SelectValuesResponse,
  ComparisonResponse,
  SubmitChoiceResponse,
  ValueSummaryResponse
} from '../types/values'
import {
  createValueSession,
  selectValues,
  getNextComparison,
  submitChoice,
  getValueSummary
} from '../engine/valueFlow'
import { ApiError } from '../engine/errors'
import { putValueSession, getValueSession, save } from '../sessionRegistry'

function requireSession(gameId: string) {
  const session = getValueSession(gameId)
  if (!session) throw new ApiError(404, 'Game session not found')
  return session
}

export const valuesApi = {
  /**
   * 开始价值观游戏
   */
  async startGame(): Promise<StartValueGameResponse> {
    const { session, response } = createValueSession()
    putValueSession(response.game_id, session)
    return response
  },

  /**
   * 提交选择的价值观
   */
  async selectValues(gameId: string, selectedValues: string[]): Promise<SelectValuesResponse> {
    const session = requireSession(gameId)
    const response = selectValues(session, selectedValues)
    save()
    return response
  },

  /**
   * 获取下一对需要比较的价值观和案例
   */
  async getNextComparison(gameId: string): Promise<ComparisonResponse> {
    const session = requireSession(gameId)
    const response = getNextComparison(session)
    save()
    return response
  },

  /**
   * 提交选择（初始选择或确认后的选择）
   */
  async submitChoice(
    gameId: string,
    winner: 'value_a' | 'value_b'
  ): Promise<SubmitChoiceResponse> {
    const session = requireSession(gameId)
    const response = submitChoice(session, winner)
    save()
    return response
  },

  /**
   * 获取游戏总结
   */
  async getSummary(gameId: string): Promise<ValueSummaryResponse> {
    return getValueSummary(requireSession(gameId))
  }
}
