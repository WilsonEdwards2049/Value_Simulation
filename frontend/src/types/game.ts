export interface MetricValue {
  name: string;
  display_name: string;
  value: number;
  normalized: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface PendingEffect {
  metric: string;
  delta: number;
  apply_at_round: number;
  description: string;
  source_choice_id: string;
}

export interface ChoiceHistoryEntry {
  round: number;
  scenario_id: string;
  scenario_title: string;
  choice_id: string;
  choice_text: string;
  effects: Record<string, number>;
}

export interface GameState {
  game_id: string;
  identity: string;
  current_round: number;
  max_rounds: number;
  metrics: Record<string, MetricValue>;
  pending_effects: PendingEffect[];
  choice_history: ChoiceHistoryEntry[];
  choice_type_counts: Record<string, number>;
  status: 'playing' | 'ended';
}

export interface DelayedEffect {
  delay_rounds: number;
  metric: string;
  delta: number;
  description: string;
}

export interface Choice {
  id: string;
  text: string;
  immediate_effects: Record<string, number>;
  delayed_effects: DelayedEffect[];
  econ_principle: string;
  principle_explanation: string;
}

export interface Scenario {
  id: string;
  type: string;
  title: string;
  description: string;
  choices: Choice[];
  // Theme context — populated by backend, optional for backwards compat
  theme_title?: string | null;
  theme_index?: number | null;
  total_themes?: number | null;
  step_in_theme?: number | null;
  steps_in_theme?: number | null;
}

export interface EffectResult {
  metric: string;
  display_name: string;
  delta: number;
  old_value: number;
  new_value: number;
}

export interface ChoiceResponse {
  state: GameState;
  immediate_effects: EffectResult[];
  pending_preview: Array<{ description: string; delay_rounds: number; metric: string }>;
  econ_principle: string;
  principle_explanation: string;
  round_completed: number;
}

export interface KeyDecision {
  round: number;
  title: string;
  choice: string;
  impact: number;
  effects: Record<string, number>;
}

export interface SummaryResponse {
  game_id: string;
  identity: string;
  total_rounds: number;
  final_metrics: Record<string, MetricValue>;
  metric_history: Array<Record<string, number>>;
  key_decisions: KeyDecision[];
  scores: Record<string, number>;
  overall_score: number;
  grade: string;
  comment: string;
}

export type AppStatus = 'identity_select' | 'playing' | 'feedback' | 'summary';
