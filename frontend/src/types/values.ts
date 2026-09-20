/**
 * 价值观游戏的TypeScript类型定义
 */

export interface ValueInfo {
  id: string
  name: string
  description: string
  examples: string[]
}

export interface CaseInfo {
  case_id: string
  title: string
  real_person: string
  year: number
  location: string
  context: string
  dilemma: string
  actual_choice: string
  consequences: string
  choice_a_text: string
  choice_b_text: string
  reflection: string
  impact_score: number
  controversy_level: number
}

export interface ComparisonProgress {
  total: number
  completed: number
  remaining: number
  percentage: number
}

export interface ValueRankingItem {
  rank: number
  value: ValueInfo
  win_count: number
  loss_count: number
}

// API Response Types
export interface StartValueGameResponse {
  game_id: string
  values: ValueInfo[]
  message: string
}

export interface SelectValuesResponse {
  game_id: string
  selected_values: ValueInfo[]
  total_comparisons: number
  message: string
}

export interface ComparisonResponse {
  game_id: string
  value_a: ValueInfo
  value_b: ValueInfo
  case: CaseInfo | null  // Stage 1 没有案例
  progress: ComparisonProgress
  stage: 'initial' | 'first_challenge' | 'second_challenge'
  initial_choice?: 'value_a' | 'value_b'  // 玩家的初始选择
  message: string
}

export interface SubmitChoiceResponse {
  game_id: string
  action: 'challenge' | 'next_comparison' | 'complete'
  case: CaseInfo | null  // 如果是challenge，返回案例
  stage: 'first_challenge' | 'second_challenge' | 'confirmed'
  message: string
}

export interface ValueSummaryResponse {
  game_id: string
  ranking: ValueRankingItem[]
  total_comparisons: number
  adjustments_made: number
  key_conflicts: Array<{
    value_a: string
    value_b: string
    winner: string
    adjusted: boolean
  }>
  analysis: string
  message: string
}

// Frontend State Types
export type ValueGameStatus = 'idle' | 'selecting' | 'comparing' | 'summary'

export interface ValueGameState {
  status: ValueGameStatus
  gameId: string | null
  availableValues: ValueInfo[]
  selectedValues: ValueInfo[]
  currentComparison: ComparisonResponse | null
  summary: ValueSummaryResponse | null
  isLoading: boolean
  error: string | null
}
