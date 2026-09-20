import type { Scenario } from '../../types/game'

const SCENARIO_TYPE_LABELS: Record<string, string> = {
  resource_allocation: '资源分配',
  ethical_dilemma: '道德困境',
  moral_dilemma: '道德困境',
  crisis_response: '危机应对',
  crisis_management: '危机处理',
  long_short_tradeoff: '长短取舍',
  short_long_tradeoff: '长短取舍',
  game_theory: '博弈论',
  strategic_choice: '战略抉择',
}

const SCENARIO_TYPE_COLORS: Record<string, string> = {
  resource_allocation: 'bg-blue-900/40 text-blue-300 border-blue-700',
  ethical_dilemma: 'bg-purple-900/40 text-purple-300 border-purple-700',
  moral_dilemma: 'bg-purple-900/40 text-purple-300 border-purple-700',
  crisis_response: 'bg-red-900/40 text-red-300 border-red-700',
  crisis_management: 'bg-red-900/40 text-red-300 border-red-700',
  long_short_tradeoff: 'bg-amber-900/40 text-amber-300 border-amber-700',
  short_long_tradeoff: 'bg-amber-900/40 text-amber-300 border-amber-700',
  game_theory: 'bg-cyan-900/40 text-cyan-300 border-cyan-700',
  strategic_choice: 'bg-emerald-900/40 text-emerald-300 border-emerald-700',
}

const CHOICE_LETTERS = ['A', 'B', 'C', 'D']

interface Props {
  scenario: Scenario
  onChoiceSelect: (choiceId: string) => void
  isLoading: boolean
}

export default function ScenarioPanel({ scenario, onChoiceSelect, isLoading }: Props) {
  const typeLabel = SCENARIO_TYPE_LABELS[scenario.type] ?? scenario.type
  const typeColor =
    SCENARIO_TYPE_COLORS[scenario.type] ??
    'bg-slate-800 text-slate-300 border-slate-600'

  const hasTheme = scenario.theme_title != null && scenario.theme_index != null

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 h-full flex flex-col">
      {/* Theme Banner */}
      {hasTheme && (
        <div className="mb-4 px-4 py-3 bg-indigo-950/60 border border-indigo-800/60 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wide">主题</span>
              <span className="text-indigo-200 text-sm font-medium">{scenario.theme_title}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {scenario.steps_in_theme != null && scenario.steps_in_theme > 1 && (
                <span className="text-indigo-400 text-xs">
                  第 {(scenario.step_in_theme ?? 0) + 1}/{scenario.steps_in_theme} 步
                </span>
              )}
            </div>
          </div>
          {/* Theme step dots */}
          {scenario.steps_in_theme != null && scenario.steps_in_theme > 1 && (
            <div className="flex gap-1.5 mt-2">
              {Array.from({ length: scenario.steps_in_theme }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full flex-1 ${
                    i <= (scenario.step_in_theme ?? 0)
                      ? 'bg-indigo-400'
                      : 'bg-indigo-900'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-2 py-0.5 text-xs rounded-md border ${typeColor}`}
          >
            {typeLabel}
          </span>
        </div>
        <h2 className="text-xl font-bold text-white">{scenario.title}</h2>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-shrink-0">
        {scenario.description}
      </p>

      {/* Choices */}
      <div className="space-y-3 flex-1">
        {scenario.choices.map((choice, idx) => (
          <button
            key={choice.id}
            onClick={() => !isLoading && onChoiceSelect(choice.id)}
            disabled={isLoading}
            className={`
              w-full text-left p-4 rounded-lg border-2 transition-all duration-150
              ${isLoading
                ? 'opacity-50 cursor-not-allowed border-slate-700 bg-slate-800/40'
                : 'border-slate-700 bg-slate-800/40 hover:border-slate-400 hover:bg-slate-700/60 cursor-pointer active:scale-[0.99]'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                {CHOICE_LETTERS[idx] ?? choice.id}
              </span>
              <span className="text-slate-200 text-sm leading-relaxed">
                {choice.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
