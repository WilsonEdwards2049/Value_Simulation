import type { KeyDecision, SummaryResponse } from '../types/game';
import type { GameSession } from './session';

const IDENTITY_NAMES: Record<string, string> = {
  mayor: '市长',
  small_company: '小公司老板',
  tech_giant: '头部科技公司老板',
  small_nation: '小国元首',
  superpower: '大国元首',
};

export function generateSummary(session: GameSession): SummaryResponse {
  const state = session.state;

  const scores: Record<string, number> = {};
  for (const [k, v] of Object.entries(state.metrics)) {
    scores[k] = Math.round(v.normalized * 10) / 10;
  }

  const scoreValues = Object.values(scores);
  const overallScore =
    scoreValues.length > 0
      ? Math.round((scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length) * 10) / 10
      : 0;

  let grade: string;
  if (overallScore >= 90) grade = 'S';
  else if (overallScore >= 80) grade = 'A';
  else if (overallScore >= 70) grade = 'B';
  else if (overallScore >= 60) grade = 'C';
  else if (overallScore >= 50) grade = 'D';
  else grade = 'F';

  const identityName = IDENTITY_NAMES[state.identity] ?? state.identity;
  const comments: Record<string, string> = {
    S: `卓越！你作为${identityName}展现了非凡的决策能力，各项指标全面向好，堪称典范。`,
    A: `优秀！你作为${identityName}的施政成效显著，大多数指标保持在高位，只有少数地方需要改进。`,
    B: `良好。你作为${identityName}较好地平衡了各方面利益，但仍有提升空间，部分指标需要关注。`,
    C: `及格。你作为${identityName}的决策整体尚可，但多项关键指标表现不佳，需要反思策略。`,
    D: `较差。你作为${identityName}的决策效果有限，多数指标下滑明显，政策方向需要大幅调整。`,
    F: `失败。你作为${identityName}的执政期间各项指标全面恶化，离任时局面已相当糟糕，需深刻反省。`,
  };

  const keyDecisions: KeyDecision[] = state.choice_history.map((entry) => {
    const effects = entry.effects ?? {};
    return {
      round: entry.round,
      title: entry.scenario_title ?? '未知场景',
      choice: entry.choice_text ?? entry.choice_id ?? '',
      impact: Object.values(effects).reduce((sum, v) => sum + Math.abs(v), 0),
      effects,
    };
  });
  keyDecisions.sort((a, b) => b.impact - a.impact);

  return {
    game_id: state.game_id,
    identity: state.identity,
    total_rounds: state.current_round - 1,
    final_metrics: state.metrics,
    metric_history: session.metric_snapshots,
    key_decisions: keyDecisions.slice(0, 3),
    scores,
    overall_score: overallScore,
    grade,
    comment: comments[grade] ?? '游戏结束。',
  };
}
