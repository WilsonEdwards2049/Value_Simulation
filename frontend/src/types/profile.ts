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
  adjustmentLevel: AdjustmentLevel
  radar: ProfileRadarDatum[]
  useBars: boolean
}

export type { ValueSummaryResponse }
