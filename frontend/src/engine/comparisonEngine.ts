import type { ComparisonProgress } from '../types/values';
import { getCasesForPair } from './data';

/** Fisher-Yates，对应 Python 的 random.shuffle。 */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** 生成所有存在案例的价值观配对，顺序打乱。 */
export function generateComparisonPairs(selectedValues: string[]): Array<[string, string]> {
  const validPairs: Array<[string, string]> = [];
  for (let i = 0; i < selectedValues.length; i++) {
    for (let j = i + 1; j < selectedValues.length; j++) {
      const pair: [string, string] = [selectedValues[i], selectedValues[j]];
      if (getCasesForPair(pair[0], pair[1]).length > 0) {
        validPairs.push(pair);
      }
    }
  }
  return shuffle(validPairs);
}

/** Kahn 拓扑排序：由两两比较结果推导优先级排序。 */
export function sortByComparisons(
  values: string[],
  comparisons: Array<[string, string, string]>
): string[] {
  const graph: Record<string, string[]> = {};
  const inDegree: Record<string, number> = {};
  for (const v of values) {
    graph[v] = [];
    inDegree[v] = 0;
  }

  for (const [valueA, valueB, winner] of comparisons) {
    if (winner === valueA) {
      if (!graph[valueA].includes(valueB)) {
        graph[valueA].push(valueB);
        inDegree[valueB] += 1;
      }
    } else if (winner === valueB) {
      if (!graph[valueB].includes(valueA)) {
        graph[valueB].push(valueA);
        inDegree[valueA] += 1;
      }
    }
  }

  const queue = values.filter((v) => inDegree[v] === 0);
  const result: string[] = [];

  while (queue.length > 0) {
    // 多个零入度节点时，胜场多的优先
    queue.sort((a, b) => graph[b].length - graph[a].length);
    const current = queue.shift()!;
    result.push(current);

    for (const neighbor of graph[current]) {
      inDegree[neighbor] -= 1;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  // 理论上不该有环，兜底：剩余节点按胜场数排序
  if (result.length < values.length) {
    const remaining = values.filter((v) => !result.includes(v));
    remaining.sort((a, b) => graph[b].length - graph[a].length);
    result.push(...remaining);
  }

  return result;
}

export function getComparisonProgress(session: {
  pairs_to_compare: unknown[];
  current_pair_index: number;
}): ComparisonProgress {
  const total = session.pairs_to_compare.length;
  const completed = session.current_pair_index;
  return {
    total,
    completed,
    remaining: total - completed,
    percentage: total > 0 ? Math.round((completed / total) * 1000) / 10 : 0,
  };
}
