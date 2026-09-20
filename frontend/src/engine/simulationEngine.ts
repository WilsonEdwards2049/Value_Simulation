import type { ChoiceResponse, EffectResult, PendingEffect, Scenario } from '../types/game';
import type { GameSession } from './session';
import { applyMarginalDiminishing, applyRandomPerturbation, updateMetric } from './effectCalculator';

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function processChoice(session: GameSession, scenario: Scenario, choiceId: string): ChoiceResponse {
  const state = session.state;
  const choice = scenario.choices.find((c) => c.id === choiceId);
  if (!choice) throw new Error(`Choice ${choiceId} not found in scenario ${scenario.id}`);

  const immediateEffects: EffectResult[] = [];

  // Step 1-4: 立即效果（边际递减 + 随机扰动）
  for (const [metricKey, rawDelta] of Object.entries(choice.immediate_effects)) {
    const metric = state.metrics[metricKey];
    if (!metric) continue;
    let delta = applyMarginalDiminishing(rawDelta, choice.econ_principle, state.choice_type_counts);
    delta = applyRandomPerturbation(delta, state.current_round, state.max_rounds);
    const oldNorm = metric.normalized;
    const updated = updateMetric(metric, delta);
    state.metrics[metricKey] = updated;
    immediateEffects.push({
      metric: metricKey,
      display_name: metric.display_name,
      delta: round2(updated.normalized - oldNorm),
      old_value: round2(oldNorm),
      new_value: round2(updated.normalized),
    });
  }

  // Step 5: 结算本轮到期的延迟效果
  const remainingPending: PendingEffect[] = [];
  for (const pe of state.pending_effects) {
    if (pe.apply_at_round === state.current_round) {
      const metric = state.metrics[pe.metric];
      if (metric) {
        const delta = applyRandomPerturbation(pe.delta, state.current_round, state.max_rounds);
        state.metrics[pe.metric] = updateMetric(metric, delta);
      }
    } else {
      remainingPending.push(pe);
    }
  }
  state.pending_effects = remainingPending;

  // Step 6: 登记新的延迟效果
  const pendingPreview: ChoiceResponse['pending_preview'] = [];
  for (const de of choice.delayed_effects) {
    state.pending_effects.push({
      metric: de.metric,
      delta: de.delta,
      apply_at_round: state.current_round + de.delay_rounds,
      description: de.description,
      source_choice_id: choiceId,
    });
    pendingPreview.push({
      description: de.description,
      delay_rounds: de.delay_rounds,
      metric: de.metric,
    });
  }

  // Step 7: 记录历史
  const effects: Record<string, number> = {};
  for (const e of immediateEffects) effects[e.metric] = round2(e.delta);
  state.choice_history.push({
    round: state.current_round,
    scenario_id: scenario.id,
    scenario_title: scenario.title,
    choice_id: choiceId,
    choice_text: choice.text,
    effects,
  });

  // Step 8: 累计策略类型使用次数
  state.choice_type_counts[choice.econ_principle] =
    (state.choice_type_counts[choice.econ_principle] ?? 0) + 1;

  // Step 9: 指标快照
  const snapshot: Record<string, number> = { round: state.current_round };
  for (const [k, v] of Object.entries(state.metrics)) snapshot[k] = round2(v.normalized);
  session.metric_snapshots.push(snapshot);

  if (!session.scenario_history.includes(scenario.id)) {
    session.scenario_history.push(scenario.id);
  }

  const roundCompleted = state.current_round;

  // Step 10: 推进回合
  state.current_round += 1;
  if (state.current_round > state.max_rounds) {
    state.status = 'ended';
  }

  return {
    state,
    immediate_effects: immediateEffects,
    pending_preview: pendingPreview,
    econ_principle: choice.econ_principle,
    principle_explanation: choice.principle_explanation,
    round_completed: roundCompleted,
  };
}
