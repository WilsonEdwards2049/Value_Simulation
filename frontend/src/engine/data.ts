import type { ValueInfo } from '../types/values';
import casesJson from '../data/cases.json';
import valuesJson from '../data/values.json';

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

export const CASES = casesJson as unknown as ValueCase[];
export const VALUES = valuesJson as ValueInfo[];

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
