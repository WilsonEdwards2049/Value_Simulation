import type { ValueInfo } from '../types/values';
import type { Locale } from '../i18n/locales';
import { getActiveLocale } from '../i18n';
import valuesZhCN from '../data/values.json';
import valuesZhTW from '../data/values.zh-TW.json';
import valuesEn from '../data/values.en.json';
import valuesDe from '../data/values.de.json';
import valuesJa from '../data/values.ja.json';
import valuesFr from '../data/values.fr.json';
import valuesKo from '../data/values.ko.json';
import valuesEs from '../data/values.es.json';
import casesZhCN from '../data/cases.json';
import casesZhTW from '../data/cases.zh-TW.json';
import casesEn from '../data/cases.en.json';
import casesDe from '../data/cases.de.json';
import casesJa from '../data/cases.ja.json';
import casesFr from '../data/cases.fr.json';
import casesKo from '../data/cases.ko.json';
import casesEs from '../data/cases.es.json';

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
  hidden_for_pairs?: [string, string][];
}

const VALUES_BY_LOCALE: Record<Locale, ValueInfo[]> = {
  'zh-CN': valuesZhCN as ValueInfo[],
  'zh-TW': valuesZhTW as ValueInfo[],
  en: valuesEn as ValueInfo[],
  de: valuesDe as ValueInfo[],
  ja: valuesJa as ValueInfo[],
  fr: valuesFr as ValueInfo[],
  ko: valuesKo as ValueInfo[],
  es: valuesEs as ValueInfo[],
};

const CASES_BY_LOCALE: Record<Locale, ValueCase[]> = {
  'zh-CN': casesZhCN as unknown as ValueCase[],
  'zh-TW': casesZhTW as unknown as ValueCase[],
  en: casesEn as unknown as ValueCase[],
  de: casesDe as unknown as ValueCase[],
  ja: casesJa as unknown as ValueCase[],
  fr: casesFr as unknown as ValueCase[],
  ko: casesKo as unknown as ValueCase[],
  es: casesEs as unknown as ValueCase[],
};

/** 案例 ID 与选择逻辑不随语言变化，统一以简体中文版为基准。 */
export const CASES = CASES_BY_LOCALE['zh-CN'];
export const VALUE_COUNT = VALUES_BY_LOCALE['zh-CN'].length;

function activeValues(): ValueInfo[] {
  return VALUES_BY_LOCALE[getActiveLocale()];
}

export function getAllValues(): ValueInfo[] {
  return activeValues();
}

export function getValueById(valueId: string): ValueInfo | undefined {
  return activeValues().find((v) => v.id === valueId);
}

export function getCasesForPair(valueA: string, valueB: string): ValueCase[] {
  return CASES_BY_LOCALE[getActiveLocale()].filter((c) => {
    const hiddenForPair = c.hidden_for_pairs?.some(
      ([a, b]) => (a === valueA && b === valueB) || (a === valueB && b === valueA)
    );
    if (hiddenForPair) return false;

    const [a, b] = c.value_pair;
    return (a === valueA && b === valueB) || (a === valueB && b === valueA);
  });
}
