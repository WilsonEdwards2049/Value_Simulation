/** file:// 下部分浏览器不提供 crypto.randomUUID，需降级。 */
export function newGameId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export interface ValueComparison {
  value_a: string;
  value_b: string;
  winner: string;
  case_id: string;
  player_adjusted: boolean;
}

/** 对应后端 models/value_models.py 的 ValueGameState。 */
export interface ValueSession {
  game_id: string;
  selected_values: string[];
  comparison_history: ValueComparison[];
  current_comparison: { value_a: string; value_b: string; case_id?: string } | null;
  ranking: string[];
  status: 'selecting' | 'comparing' | 'ended';
  pairs_to_compare: Array<[string, string]>;
  current_pair_index: number;
  current_stage: 'initial' | 'first_challenge' | 'second_challenge';
  initial_choice: 'value_a' | 'value_b' | null;
  shown_case_ids: string[];
}
