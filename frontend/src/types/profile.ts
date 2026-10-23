import type { ValueSummaryResponse } from './values'

export const VALUE_IDS = [
  'justice',
  'freedom',
  'life',
  'family',
  'faith',
  'truth',
  'loyalty',
  'safety',
  'environment',
  'contract',
] as const

export type ValueId = (typeof VALUE_IDS)[number]

export function isValueId(id: string): id is ValueId {
  return (VALUE_IDS as readonly string[]).includes(id)
}

export const PAIR_IDS = [
  'justice-freedom',
  'justice-life',
  'justice-family',
  'justice-faith',
  'justice-truth',
  'justice-loyalty',
  'justice-safety',
  'justice-environment',
  'justice-contract',
  'freedom-life',
  'freedom-family',
  'freedom-faith',
  'freedom-truth',
  'freedom-loyalty',
  'freedom-safety',
  'freedom-environment',
  'freedom-contract',
  'life-family',
  'life-faith',
  'life-truth',
  'life-loyalty',
  'life-safety',
  'life-environment',
  'life-contract',
  'family-faith',
  'family-truth',
  'family-loyalty',
  'family-safety',
  'family-environment',
  'family-contract',
  'faith-truth',
  'faith-loyalty',
  'faith-safety',
  'faith-environment',
  'faith-contract',
  'truth-loyalty',
  'truth-safety',
  'truth-environment',
  'truth-contract',
  'loyalty-safety',
  'loyalty-environment',
  'loyalty-contract',
  'safety-environment',
  'safety-contract',
  'environment-contract',
] as const

export type PairId = (typeof PAIR_IDS)[number]

export function pairIdOf(a: ValueId, b: ValueId): PairId {
  const ia = VALUE_IDS.indexOf(a)
  const ib = VALUE_IDS.indexOf(b)
  const [first, second] = ia <= ib ? [a, b] : [b, a]
  return `${first}-${second}` as PairId
}

export interface CharacterCopy {
  name: string
  source: string
  similarity: string
  difference: string
}

export interface CharacterContent {
  title: string
  subtitle: string
  similarityLabel: string
  differenceLabel: string
  characters: Record<PairId, CharacterCopy>
}

export type AdjustmentLevel = 'firm' | 'adaptive' | 'flexible'

export interface ArchetypeCopy {
  name: string
  tagline: string
  description: string
  strengths: [string, string, string]
  blindSpot: string
  decisionStyle: string
}

export interface ProfileContent {
  sectionTitle: string
  sectionSubtitle: string
  archetypeLabel: string
  strengthsLabel: string
  blindSpotLabel: string
  decisionStyleLabel: string
  tensionTitle: string
  tensionBetween: string
  radarTitle: string
  radarCaption: string
  barsTitle: string
  strengthLabel: string
  adjustmentTitle: string
  adjustmentLabels: Record<AdjustmentLevel, string>
  adjustmentDescriptions: Record<AdjustmentLevel, string>
  archetypes: Record<ValueId, ArchetypeCopy>
  tensions: Record<ValueId, string>
  radarLabels: Record<ValueId, string>
}

export interface ProfileRadarDatum {
  valueId: ValueId
  strength: number
}

export interface DerivedProfile {
  topId: ValueId | null
  secondId: ValueId | null
  pairId: PairId | null
  adjustmentLevel: AdjustmentLevel
  radar: ProfileRadarDatum[]
  useBars: boolean
}

export type { ValueSummaryResponse }
