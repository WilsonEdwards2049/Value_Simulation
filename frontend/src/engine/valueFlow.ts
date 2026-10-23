import type {
  ComparisonResponse,
  StartValueGameResponse,
  SelectValuesResponse,
  SubmitChoiceResponse,
  ValueSummaryResponse,
  ValueInfo,
  ValueRankingItem,
} from '../types/values';
import type { ValueSession } from './session';
import { newGameId } from './session';
import { getAllValues, getValueById, getCasesForPair } from './data';
import {
  generateComparisonPairs,
  sortByComparisons,
  getComparisonProgress,
} from './comparisonEngine';
import { prepareCaseForDisplay, selectChallengeCase } from './caseSelector';
import { ApiError } from './errors';
import { getActiveLocale, buildAnalysis } from '../i18n';
import { engineMessage } from '../i18n/engineMessages';

function requireValue(valueId: string): ValueInfo {
  const v = getValueById(valueId);
  if (!v) throw new ApiError(400, engineMessage(getActiveLocale(), 'errInvalidValue', { id: valueId }));
  return v;
}

export function createValueSession(): { session: ValueSession; response: StartValueGameResponse } {
  const gameId = newGameId();
  const session: ValueSession = {
    game_id: gameId,
    selected_values: [],
    comparison_history: [],
    current_comparison: null,
    ranking: [],
    status: 'selecting',
    pairs_to_compare: [],
    current_pair_index: 0,
    current_stage: 'initial',
    initial_choice: null,
    shown_case_ids: [],
  };

  return {
    session,
    response: {
      game_id: gameId,
      values: getAllValues(),
      message: engineMessage(getActiveLocale(), 'startPrompt'),
    },
  };
}

export function selectValues(session: ValueSession, selectedValues: string[]): SelectValuesResponse {
  if (session.status !== 'selecting') {
    throw new ApiError(400, engineMessage(getActiveLocale(), 'errNotSelecting'));
  }
  const maxValues = getAllValues().length;
  if (selectedValues.length < 2 || selectedValues.length > maxValues) {
    throw new ApiError(400, engineMessage(getActiveLocale(), 'errSelectRange', { max: maxValues }));
  }
  const selectedInfos = selectedValues.map(requireValue);

  const pairs = generateComparisonPairs(selectedValues);
  const minPairsNeeded = selectedValues.length - 1;
  if (pairs.length < minPairsNeeded) {
    const available = pairs.map((p) => `  - ${p[0]} vs ${p[1]}`).join('\n');
    throw new ApiError(
      400,
      `所选价值观之间只有 ${pairs.length} 个可比较的配对，至少需要 ${minPairsNeeded} 个才能完成排序。\n` +
        `当前可比较的配对：\n${available}\n\n请尝试选择以下组合之一：\n` +
        '  推荐组合1: 正义、忠诚、真实、生命、自由、安全\n' +
        '  推荐组合2: 信仰、亲情、正义、忠诚、真实'
    );
  }

  session.selected_values = selectedValues;
  session.pairs_to_compare = pairs;
  session.current_pair_index = 0;
  session.status = 'comparing';

  return {
    game_id: session.game_id,
    selected_values: selectedInfos,
    total_comparisons: pairs.length,
    message: engineMessage(getActiveLocale(), 'selectedStart', { count: selectedValues.length }),
  };
}

/** 第一阶段：不给案例，让玩家凭直觉选。 */
export function getNextComparison(session: ValueSession): ComparisonResponse {
  if (session.status === 'selecting') throw new ApiError(400, engineMessage(getActiveLocale(), 'errNotSelecting'));
  if (session.status === 'ended') throw new ApiError(400, engineMessage(getActiveLocale(), 'errGameEnded'));

  if (session.current_pair_index >= session.pairs_to_compare.length) {
    session.status = 'ended';
    throw new ApiError(400, engineMessage(getActiveLocale(), 'errAllCompleted'));
  }

  const [valueAId, valueBId] = session.pairs_to_compare[session.current_pair_index];

  session.current_stage = 'initial';
  session.initial_choice = null;
  session.shown_case_ids = [];
  session.current_comparison = { value_a: valueAId, value_b: valueBId };

  return {
    game_id: session.game_id,
    value_a: requireValue(valueAId),
    value_b: requireValue(valueBId),
    case: null,
    progress: getComparisonProgress(session),
    stage: 'initial',
    message: engineMessage(getActiveLocale(), 'intuition'),
  };
}

/**
 * 三阶段推进：
 * 1. initial → first_challenge：用情感倾向相反的案例挑战直觉选择
 * 2. first_challenge → 坚持则确认 / 改选则进入 second_challenge
 * 3. second_challenge → 最终确认
 */
export function submitChoice(
  session: ValueSession,
  winner: 'value_a' | 'value_b'
): SubmitChoiceResponse {
  if (session.status !== 'comparing') throw new ApiError(400, engineMessage(getActiveLocale(), 'errNotComparing'));
  if (!session.current_comparison) throw new ApiError(400, engineMessage(getActiveLocale(), 'errNoActiveComparison'));
  if (winner !== 'value_a' && winner !== 'value_b') {
    throw new ApiError(400, engineMessage(getActiveLocale(), 'errInvalidWinner'));
  }

  const { value_a: valueAId, value_b: valueBId } = session.current_comparison;
  const stage = session.current_stage;

  if (stage === 'initial') {
    session.initial_choice = winner;
    session.current_stage = 'first_challenge';

    // 玩家选了 A 就找倾向 B 的案例来挑战，反之亦然
    const targetLean = winner === 'value_a' ? valueBId : valueAId;
    const targetDirection =
      winner === 'value_a' ? `${valueBId}_over_${valueAId}` : `${valueAId}_over_${valueBId}`;

    const caseData = selectChallengeCase(
      getCasesForPair(valueAId, valueBId),
      targetLean,
      targetDirection,
      session.shown_case_ids
    );
    if (!caseData) {
      throw new ApiError(500, engineMessage(getActiveLocale(), 'errNoCase'));
    }

    session.shown_case_ids.push(caseData.id);
    session.current_comparison.case_id = caseData.id;

    return {
      game_id: session.game_id,
      action: 'challenge',
      case: prepareCaseForDisplay(caseData, valueAId, valueBId),
      stage: 'first_challenge',
      message: engineMessage(getActiveLocale(), 'firstChallenge'),
    };
  }

  if (stage === 'first_challenge') {
    // 坚持初始选择说明立场稳定，直接确认
    if (winner === session.initial_choice) {
      return confirmAndNext(session, valueAId, valueBId, winner, false);
    }

    // 改选了，用支持初始选择的案例再测一次新选择是否稳定
    const targetLean = session.initial_choice === 'value_a' ? valueAId : valueBId;
    const targetDirection =
      session.initial_choice === 'value_a'
        ? `${valueAId}_over_${valueBId}`
        : `${valueBId}_over_${valueAId}`;

    const caseData = selectChallengeCase(
      getCasesForPair(valueAId, valueBId),
      targetLean,
      targetDirection,
      session.shown_case_ids
    );
    if (!caseData) {
      throw new ApiError(500, engineMessage(getActiveLocale(), 'errNoCase'));
    }

    session.current_stage = 'second_challenge';
    session.shown_case_ids.push(caseData.id);
    session.current_comparison.case_id = caseData.id;

    return {
      game_id: session.game_id,
      action: 'challenge',
      case: prepareCaseForDisplay(caseData, valueAId, valueBId),
      stage: 'second_challenge',
      message: engineMessage(getActiveLocale(), 'secondChallenge'),
    };
  }

  if (stage === 'second_challenge') {
    return confirmAndNext(session, valueAId, valueBId, winner, true);
  }

  throw new ApiError(500, engineMessage(getActiveLocale(), 'errInvalidStage', { stage }));
}

function confirmAndNext(
  session: ValueSession,
  valueAId: string,
  valueBId: string,
  winner: 'value_a' | 'value_b',
  adjusted: boolean
): SubmitChoiceResponse {
  const winnerId = winner === 'value_a' ? valueAId : valueBId;

  session.comparison_history.push({
    value_a: valueAId,
    value_b: valueBId,
    winner: winnerId,
    case_id: session.current_comparison?.case_id ?? 'unknown',
    player_adjusted: adjusted,
  });

  session.current_comparison = null;
  session.current_stage = 'initial';
  session.initial_choice = null;
  session.shown_case_ids = [];
  session.current_pair_index += 1;

  if (session.current_pair_index >= session.pairs_to_compare.length) {
    session.status = 'ended';
    session.ranking = sortByComparisons(
      session.selected_values,
      session.comparison_history.map((c) => [c.value_a, c.value_b, c.winner] as [string, string, string])
    );

    return {
      game_id: session.game_id,
      action: 'complete',
      case: null,
      stage: 'confirmed',
      message: engineMessage(getActiveLocale(), 'allComplete'),
    };
  }

  return {
    game_id: session.game_id,
    action: 'next_comparison',
    case: null,
    stage: 'confirmed',
    message: engineMessage(getActiveLocale(), 'recorded'),
  };
}

export function getValueSummary(session: ValueSession): ValueSummaryResponse {
  if (session.status !== 'ended') throw new ApiError(400, engineMessage(getActiveLocale(), 'errNotFinished'));

  const winCount: Record<string, number> = {};
  const lossCount: Record<string, number> = {};
  for (const v of session.selected_values) {
    winCount[v] = 0;
    lossCount[v] = 0;
  }

  for (const comp of session.comparison_history) {
    winCount[comp.winner] += 1;
    const loser = comp.winner === comp.value_b ? comp.value_a : comp.value_b;
    lossCount[loser] += 1;
  }

  const ranking: ValueRankingItem[] = session.ranking.map((valueId, i) => ({
    rank: i + 1,
    value: requireValue(valueId),
    win_count: winCount[valueId],
    loss_count: lossCount[valueId],
  }));

  return {
    game_id: session.game_id,
    ranking,
    total_comparisons: session.comparison_history.length,
    adjustments_made: session.comparison_history.filter((c) => c.player_adjusted).length,
    key_conflicts: identifyKeyConflicts(session),
    analysis: generateValueAnalysis(ranking),
    message: engineMessage(getActiveLocale(), 'summaryReady'),
  };
}

function generateValueAnalysis(ranking: ValueRankingItem[]): string {
  const top = ranking[0];
  const bottom = ranking[ranking.length - 1];
  return buildAnalysis(
    getActiveLocale(),
    top.value.id,
    bottom.value.id,
    top.value.name,
    bottom.value.name
  );
}

function identifyKeyConflicts(session: ValueSession): ValueSummaryResponse['key_conflicts'] {
  return session.comparison_history
    .filter((c) => c.player_adjusted)
    .slice(0, 5)
    .map((c) => ({
      value_a: requireValue(c.value_a).name,
      value_b: requireValue(c.value_b).name,
      winner: requireValue(c.winner).name,
      adjusted: true,
    }));
}
