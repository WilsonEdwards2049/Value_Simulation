import type { ValueSummaryResponse } from '../types/values'
import {
  isValueId,
  pairIdOf,
  type AdjustmentLevel,
  type DerivedProfile,
  type ProfileRadarDatum,
  type ValueId,
} from '../types/profile'

function adjustmentLevelOf(count: number): AdjustmentLevel {
  if (count <= 0) return 'firm'
  if (count <= 2) return 'adaptive'
  return 'flexible'
}

export function deriveProfile(summary: ValueSummaryResponse): DerivedProfile {
  const topId = summary.ranking[0]?.value.id
  const secondId = summary.ranking[1]?.value.id
  const validTop: ValueId | null = topId && isValueId(topId) ? topId : null
  const validSecond: ValueId | null = secondId && isValueId(secondId) ? secondId : null
  const radar: ProfileRadarDatum[] = []

  for (const item of summary.ranking.slice(0, 5)) {
    if (!isValueId(item.value.id)) continue
    const total = item.win_count + item.loss_count
    const raw = total === 0 ? 0 : Math.round((item.win_count / total) * 100)
    radar.push({
      valueId: item.value.id,
      strength: Math.min(100, Math.max(0, raw)),
    })
  }

  return {
    topId: validTop,
    secondId: validSecond,
    pairId: validTop && validSecond ? pairIdOf(validTop, validSecond) : null,
    adjustmentLevel: adjustmentLevelOf(summary.adjustments_made),
    radar,
    useBars: summary.ranking.length < 3,
  }
}
