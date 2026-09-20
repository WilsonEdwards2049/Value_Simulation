import type { MetricValue, Scenario } from '../types/game';
import type { ValueInfo } from '../types/values';
import casesJson from '../data/cases.json';
import valuesJson from '../data/values.json';
import identitiesJson from '../data/identities.json';
import mayor from '../data/scenarios/mayor.json';
import smallCompany from '../data/scenarios/small_company.json';
import smallNation from '../data/scenarios/small_nation.json';
import superpower from '../data/scenarios/superpower.json';
import techGiant from '../data/scenarios/tech_giant.json';

export interface ValueCase {
  id: string;
  value_pair: [string, string];
  direction: string;
  intuitive_lean?: string;
  title: string;
  real_person: string;
  year: number;
  location: string;
  context: string;
  dilemma: string;
  actual_choice: string;
  consequences: string;
  choice_support_a: string;
  choice_support_b: string;
  reflection: string;
  impact_score: number;
  controversy_level: number;
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  scenarios: Scenario[];
}

export const CASES = casesJson as unknown as ValueCase[];
export const VALUES = valuesJson as ValueInfo[];

const IDENTITIES = identitiesJson as unknown as Record<string, Record<string, MetricValue>>;

const SCENARIOS: Record<string, Theme[]> = {
  mayor: mayor as unknown as Theme[],
  small_company: smallCompany as unknown as Theme[],
  small_nation: smallNation as unknown as Theme[],
  superpower: superpower as unknown as Theme[],
  tech_giant: techGiant as unknown as Theme[],
};

export const VALID_IDENTITIES = Object.keys(IDENTITIES);

export function getIdentityMetrics(identity: string): Record<string, MetricValue> {
  const data = IDENTITIES[identity];
  if (!data) throw new Error(`Unknown identity: ${identity}`);
  return structuredClone(data);
}

export function loadThemes(identity: string): Theme[] {
  return SCENARIOS[identity] ?? [];
}

export function getAllValues(): ValueInfo[] {
  return VALUES;
}

export function getValueById(valueId: string): ValueInfo | undefined {
  return VALUES.find((v) => v.id === valueId);
}

export function getCasesForPair(valueA: string, valueB: string): ValueCase[] {
  return CASES.filter((c) => {
    const [a, b] = c.value_pair;
    return (a === valueA && b === valueB) || (a === valueB && b === valueA);
  });
}
