import type { GameState, ChoiceResponse, Scenario, SummaryResponse } from '../types/game';
import type { GameSession } from './session';
import { newGameId } from './session';
import { getIdentityMetrics, VALID_IDENTITIES } from './data';
import { loadThemes, getCurrentScenario, advanceScenario, findScenarioById } from './scenarioEngine';
import { processChoice } from './simulationEngine';
import { generateSummary } from './summaryGenerator';
import { ApiError } from './errors';

export function createGameSession(identity: string): {
  session: GameSession;
  response: { game_id: string; state: GameState; message: string };
} {
  if (!VALID_IDENTITIES.includes(identity)) {
    throw new ApiError(400, `Invalid identity. Choose from: ${VALID_IDENTITIES.join(', ')}`);
  }

  const gameId = newGameId();
  const state: GameState = {
    game_id: gameId,
    identity,
    current_round: 1,
    max_rounds: 9,
    metrics: getIdentityMetrics(identity),
    pending_effects: [],
    choice_history: [],
    choice_type_counts: {},
    status: 'playing',
  };

  const session: GameSession = {
    state,
    scenario_history: [],
    metric_snapshots: [],
    current_scenario_id: null,
    theme_idx: 0,
    scenario_in_theme: 0,
  };

  return {
    session,
    response: { game_id: gameId, state, message: `游戏开始！你选择了身份：${identity}` },
  };
}

/** 取当前场景并钉住它，重复调用返回同一个，避免玩家刷新时换题。 */
export function getScenario(session: GameSession): Scenario {
  if (session.state.status === 'ended') throw new ApiError(400, 'Game has ended');

  const themes = loadThemes(session.state.identity);

  if (session.current_scenario_id) {
    const pinned = findScenarioById(themes, session.current_scenario_id);
    if (pinned) return pinned;
  }

  const scenario = getCurrentScenario(session, themes);
  if (!scenario) throw new ApiError(404, 'No scenarios available');

  session.current_scenario_id = scenario.id;
  return scenario;
}

export function submitGameChoice(session: GameSession, choiceId: string): ChoiceResponse {
  if (session.state.status === 'ended') throw new ApiError(400, 'Game has ended');
  if (!session.current_scenario_id) {
    throw new ApiError(400, 'No active scenario. Call getScenario first.');
  }

  const themes = loadThemes(session.state.identity);
  const scenario = findScenarioById(themes, session.current_scenario_id);
  if (!scenario) throw new ApiError(404, 'Pinned scenario not found');

  const validIds = scenario.choices.map((c) => c.id);
  if (!validIds.includes(choiceId)) {
    throw new ApiError(400, `Invalid choice. Options: ${validIds.join(', ')}`);
  }

  session.current_scenario_id = null;
  const result = processChoice(session, scenario, choiceId);
  advanceScenario(session, themes);
  return result;
}

export function getGameSummary(session: GameSession): SummaryResponse {
  return generateSummary(session);
}
