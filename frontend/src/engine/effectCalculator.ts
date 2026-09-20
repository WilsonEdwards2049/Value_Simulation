import type { MetricValue } from '../types/game';

export function applyMarginalDiminishing(
  delta: number,
  econPrinciple: string,
  choiceTypeCounts: Record<string, number>
): number {
  const count = choiceTypeCounts[econPrinciple] ?? 0;
  return delta / (1 + 0.3 * count);
}

export function applyRandomPerturbation(delta: number, currentRound: number, maxRounds: number): number {
  const rangePct = 0.1 + 0.1 * (currentRound / maxRounds);
  return delta * (1 + (Math.random() * 2 - 1) * rangePct);
}

export function clipNormalized(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function updateMetric(metric: MetricValue, normalizedDelta: number): MetricValue {
  const oldNormalized = metric.normalized;
  const newNormalized = clipNormalized(oldNormalized + normalizedDelta);

  const newValue =
    oldNormalized !== 0 ? metric.value * (newNormalized / oldNormalized) : metric.value + normalizedDelta;

  let trend: MetricValue['trend'];
  if (normalizedDelta > 0.5) trend = 'up';
  else if (normalizedDelta < -0.5) trend = 'down';
  else trend = 'stable';

  return {
    name: metric.name,
    display_name: metric.display_name,
    value: round2(newValue),
    normalized: round2(newNormalized),
    unit: metric.unit,
    trend,
  };
}
