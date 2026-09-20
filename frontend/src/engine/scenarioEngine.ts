import type { Scenario } from '../types/game';
import type { GameSession } from './session';
import { loadThemes, type Theme } from './data';

export { loadThemes };

function withThemeContext(scenario: Scenario, themes: Theme[], tidx: number, sidx: number): Scenario {
  const theme = themes[tidx];
  return {
    ...scenario,
    theme_title: theme.title,
    theme_index: tidx,
    total_themes: themes.length,
    step_in_theme: sidx,
    steps_in_theme: theme.scenarios.length,
  };
}

export function getCurrentScenario(session: GameSession, themes: Theme[]): Scenario | null {
  if (themes.length === 0) return null;
  const tidx = session.theme_idx;
  const sidx = session.scenario_in_theme;
  if (tidx >= themes.length) return null;
  const theme = themes[tidx];
  if (sidx >= theme.scenarios.length) return null;
  return withThemeContext(theme.scenarios[sidx], themes, tidx, sidx);
}

export function advanceScenario(session: GameSession, themes: Theme[]): void {
  if (themes.length === 0) return;
  const tidx = session.theme_idx;
  const sidx = session.scenario_in_theme;
  if (tidx >= themes.length) return;
  const theme = themes[tidx];
  if (sidx + 1 < theme.scenarios.length) {
    session.scenario_in_theme = sidx + 1;
  } else {
    session.theme_idx = tidx + 1;
    session.scenario_in_theme = 0;
  }
}

export function findScenarioById(themes: Theme[], scenarioId: string): Scenario | null {
  for (let tidx = 0; tidx < themes.length; tidx++) {
    const theme = themes[tidx];
    for (let sidx = 0; sidx < theme.scenarios.length; sidx++) {
      if (theme.scenarios[sidx].id === scenarioId) {
        return withThemeContext(theme.scenarios[sidx], themes, tidx, sidx);
      }
    }
  }
  return null;
}
