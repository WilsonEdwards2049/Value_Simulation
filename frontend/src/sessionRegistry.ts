import type { ValueSession } from './engine/session';

/**
 * 替代后端的内存会话字典。引擎的完整状态（pairs_to_compare 等）都在这里，
 * 且随时落盘 localStorage，因此刷新页面不丢进度。
 */
interface Registry {
  values: Record<string, ValueSession>;
}

const STORAGE_KEY = 'value-sim-sessions-v2';

function load(): Registry {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // 只取 values，旧版本残留的经济游戏存档随下次落盘丢弃
    if (raw) return { values: (JSON.parse(raw) as Partial<Registry>).values ?? {} };
  } catch {
    // 数据损坏或禁用 localStorage 时退回内存态
  }
  return { values: {} };
}

const registry: Registry = load();

function persist(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registry));
  } catch {
    // 配额超限或隐私模式：内存态仍可用，仅失去跨刷新能力
  }
}

export function putValueSession(gameId: string, session: ValueSession): void {
  registry.values[gameId] = session;
  persist();
}

export function getValueSession(gameId: string): ValueSession | undefined {
  return registry.values[gameId];
}

/** 引擎函数直接改动 session 对象，调用方改完后用它落盘。 */
export function save(): void {
  persist();
}
