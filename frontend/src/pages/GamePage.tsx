import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import MetricsPanel from '../components/game/MetricsPanel'
import ScenarioPanel from '../components/game/ScenarioPanel'
import FeedbackModal from '../components/feedback/FeedbackModal'

const IDENTITY_NAMES: Record<string, string> = {
  small_company: '小公司老板',
  tech_giant: '头部科技公司老板',
  mayor: '市长',
  small_nation: '小国元首',
  superpower: '大国元首',
}

const IDENTITY_COLORS: Record<string, string> = {
  small_company: 'text-emerald-400',
  tech_giant: 'text-purple-400',
  mayor: 'text-blue-400',
  small_nation: 'text-amber-400',
  superpower: 'text-red-400',
}

export default function GamePage() {
  const {
    gameState,
    currentScenario,
    appStatus,
    lastChoiceResponse,
    isLoading,
    error,
    submitChoice,
    dismissFeedback,
  } = useGameStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (appStatus === 'summary') {
      navigate('/economic/summary')
    }
  }, [appStatus, navigate])

  if (!gameState) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">游戏加载中...</div>
      </div>
    )
  }

  const identityName = IDENTITY_NAMES[gameState.identity] ?? gameState.identity
  const identityColor = IDENTITY_COLORS[gameState.identity] ?? 'text-slate-300'

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="text-slate-400 text-sm">
            轮次:{' '}
            <span className="text-white font-semibold">
              {Math.min(gameState.current_round, gameState.max_rounds)}/{gameState.max_rounds}
            </span>
          </span>
          {/* Progress bar */}
          <div className="w-32 h-1.5 bg-slate-700 rounded-full">
            <div
              className="h-1.5 bg-indigo-500 rounded-full transition-all duration-500"
              style={{
                width: `${(Math.min(gameState.current_round - 1, gameState.max_rounds) / gameState.max_rounds) * 100}%`,
              }}
            />
          </div>
        </div>
        {/* Current theme title */}
        {currentScenario?.theme_title && (
          <div className="flex-1 text-center hidden sm:block">
            <span className="text-slate-500 text-xs">当前主题：</span>
            <span className="text-indigo-300 text-xs font-medium">{currentScenario.theme_title}</span>
          </div>
        )}
        <div className="text-sm flex-shrink-0">
          身份:{' '}
          <span className={`font-semibold ${identityColor}`}>{identityName}</span>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-900/30 border-b border-red-800 px-6 py-2 text-red-300 text-sm">
          错误: {error}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4" style={{ minHeight: 0 }}>
        {/* Left: Metrics Panel */}
        <div className="w-72 flex-shrink-0">
          <MetricsPanel metrics={gameState.metrics} />
        </div>

        {/* Right: Scenario Panel */}
        <div className="flex-1">
          {currentScenario ? (
            <ScenarioPanel
              scenario={currentScenario}
              onChoiceSelect={submitChoice}
              isLoading={isLoading}
            />
          ) : (
            <div className="bg-slate-900 border border-slate-700 rounded-xl h-full flex items-center justify-center">
              {isLoading ? (
                <div className="text-slate-400 animate-pulse">场景加载中...</div>
              ) : (
                <div className="text-slate-500">暂无可用场景</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {appStatus === 'feedback' && lastChoiceResponse && (
        <FeedbackModal
          response={lastChoiceResponse}
          onDismiss={dismissFeedback}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
