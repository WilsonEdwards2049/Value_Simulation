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

function requireValue(valueId: string): ValueInfo {
  const v = getValueById(valueId);
  if (!v) throw new ApiError(400, `Invalid value ID: ${valueId}`);
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
      message: '请从以下价值观中选择至少2个你认为最重要的',
    },
  };
}

export function selectValues(session: ValueSession, selectedValues: string[]): SelectValuesResponse {
  if (session.status !== 'selecting') {
    throw new ApiError(400, 'Game is not in selecting phase');
  }
  const maxValues = getAllValues().length;
  if (selectedValues.length < 2 || selectedValues.length > maxValues) {
    throw new ApiError(400, `Please select 2-${maxValues} values`);
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
    message: `你选择了${selectedValues.length}个价值观，现在开始配对比较`,
  };
}

/** 第一阶段：不给案例，让玩家凭直觉选。 */
export function getNextComparison(session: ValueSession): ComparisonResponse {
  if (session.status === 'selecting') throw new ApiError(400, 'Please select values first');
  if (session.status === 'ended') throw new ApiError(400, 'Game has ended');

  if (session.current_pair_index >= session.pairs_to_compare.length) {
    session.status = 'ended';
    throw new ApiError(400, 'All comparisons completed');
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
    message: '请凭直觉选择：这两个价值观中，哪个对你更重要？',
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
  if (session.status !== 'comparing') throw new ApiError(400, 'Game is not in comparing phase');
  if (!session.current_comparison) throw new ApiError(400, 'No active comparison');
  if (winner !== 'value_a' && winner !== 'value_b') {
    throw new ApiError(400, "Winner must be 'value_a' or 'value_b'");
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
      throw new ApiError(
        500,
        `No case with intuitive_lean=${targetLean} found for ${valueAId} vs ${valueBId}`
      );
    }

    session.shown_case_ids.push(caseData.id);
    session.current_comparison.case_id = caseData.id;

    return {
      game_id: session.game_id,
      action: 'challenge',
      case: prepareCaseForDisplay(caseData, valueAId, valueBId),
      stage: 'first_challenge',
      message: '让我们看一个真实案例，挑战你的选择...',
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
      throw new ApiError(
        500,
        `Second challenge: No case with lean=${targetLean} found for ${valueAId} vs ${valueBId}`
      );
    }

    session.current_stage = 'second_challenge';
    session.shown_case_ids.push(caseData.id);
    session.current_comparison.case_id = caseData.id;

    return {
      game_id: session.game_id,
      action: 'challenge',
      case: prepareCaseForDisplay(caseData, valueAId, valueBId),
      stage: 'second_challenge',
      message: '让我们再看一个案例，确认你的新选择...',
    };
  }

  if (stage === 'second_challenge') {
    return confirmAndNext(session, valueAId, valueBId, winner, true);
  }

  throw new ApiError(500, `Invalid stage: ${stage}`);
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
      message: '所有比较已完成！正在生成你的价值观谱系...',
    };
  }

  return {
    game_id: session.game_id,
    action: 'next_comparison',
    case: null,
    stage: 'confirmed',
    message: '比较已记录，准备下一对比较',
  };
}

export function getValueSummary(session: ValueSession): ValueSummaryResponse {
  if (session.status !== 'ended') throw new ApiError(400, 'Game not finished yet');

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
    message: '你的价值观谱系已生成',
  };
}

const TOP_VALUE_ANALYSIS: Record<string, string> = {
  justice: '你是一个正义导向的人，重视公平、追究作恶与保护无辜，反对让无关者受到牵连，愿意为此付出代价，即使这意味着与亲人、组织或社会规范产生冲突。',
  freedom: '你高度珍视个人自由和自主选择，倾向于抵制任何形式的强制和控制，即使这可能带来风险。',
  family: '你把家庭和亲情放在首位，愿意为保护家人做出重大牺牲，血缘关系在你心中具有特殊地位。',
  life: '你坚守生命神圣的原则，反对任何形式的杀戮和暴力，相信生命权高于其他一切价值。',
  faith: '你是一个理想主义者，愿意为信仰和理念献身，即使这意味着与现实产生激烈冲突。',
  truth: '你是一个追求真理的人，珍视客观事实和科学真相，难以接受欺骗和虚假，即使真话可能伤害他人或带来负面后果。',
  loyalty: '你是一个重视承诺和忠诚的人，对组织、团队和朋友的忠诚在你心中占据重要位置。',
  safety: '你是一个务实的人，认为公共安全和集体利益应该优先于个人自由和权利。',
  environment: '你高度关注生态和环境保护，愿意为可持续发展付出经济代价。',
  contract: '你是一个重信守诺的人，契约精神和商业诚信在你心中占据重要位置，即使履约会带来损失，你也倾向于坚守承诺。',
};

function generateValueAnalysis(ranking: ValueRankingItem[]): string {
  const top = ranking[0];
  const bottom = ranking[ranking.length - 1];
  const intro =
    `你的价值观体系中，**${top.value.name}**处于最高优先级，` +
    `而**${bottom.value.name}**的优先级相对较低。\n\n`;
  return intro + (TOP_VALUE_ANALYSIS[top.value.id] ?? '');
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
