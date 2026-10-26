import type { CaseInfo } from '../types/values';
import type { ValueCase } from './data';

/**
 * 把案例转换为展示态。案例中的 value_pair 顺序未必与当前比较的 A/B 一致，
 * 不一致时需交换两个选项文本。
 */
export function prepareCaseForDisplay(
  caseData: ValueCase,
  valueAId: string,
  _valueBId: string
): CaseInfo {
  const [caseValueA] = caseData.value_pair;
  const sameOrder = caseValueA === valueAId;

  return {
    case_id: caseData.id,
    title: caseData.title,
    real_person: caseData.real_person,
    year: caseData.year,
    location: caseData.location,
    context: caseData.context,
    dilemma: caseData.dilemma,
    actual_choice: caseData.actual_choice,
    consequences: caseData.consequences,
    choice_a_text: sameOrder ? caseData.choice_support_a : caseData.choice_support_b,
    choice_b_text: sameOrder ? caseData.choice_support_b : caseData.choice_support_a,
    reflection: caseData.reflection,
    impact_score: caseData.impact_score,
    controversy_level: caseData.controversy_level,
  };
}

/**
 * 挑选一个情感倾向为 targetLean、且未展示过的案例。
 * 契约精神/正义与公共安全、真实与生命、自由与环保配对随机选择，
 * 其他配对取冲击力最强者；无 lean 时回退到 direction。
 */
export function selectChallengeCase(
  allCases: ValueCase[],
  targetLean: string,
  targetDirection: string,
  shownCaseIds: string[]
): ValueCase | null {
  let candidates = allCases.filter(
    (c) => c.intuitive_lean === targetLean && !shownCaseIds.includes(c.id)
  );

  if (candidates.length === 0) {
    candidates = allCases.filter(
      (c) => c.direction === targetDirection && !shownCaseIds.includes(c.id)
    );
  }

  if (candidates.length === 0) return null;

  const [valueA, valueB] = candidates[0].value_pair;
  const safetyPair = [valueA, valueB].includes('safety');
  const truthLifePair = [valueA, valueB].includes('truth') && [valueA, valueB].includes('life');
  const freedomEnvironmentPair =
    [valueA, valueB].includes('freedom') && [valueA, valueB].includes('environment');
  const randomizedPair =
    truthLifePair ||
    freedomEnvironmentPair ||
    (safetyPair &&
      ([valueA, valueB].includes('contract') || [valueA, valueB].includes('justice')));
  if (randomizedPair) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  return [...candidates].sort((a, b) => b.impact_score - a.impact_score)[0];
}
