import type { ChoiceResponse } from '../../types/game'

interface Props {
  response: ChoiceResponse
  onDismiss: () => void
  isLoading: boolean
}

const ECON_PRINCIPLE_LABELS: Record<string, string> = {
  externality_negative: '负外部性',
  externality_positive: '正外部性',
  externality_pigouvian: '庇古税原理',
  multiplier_effect: '乘数效应',
  game_theory: '博弈论',
  cooperative_game: '合作博弈',
  long_short_tradeoff: '长短取舍',
  supply_demand: '供需均衡',
  marginal_diminishing: '边际递减',
  information_asymmetry: '信息不对称',
  market_mechanism: '市场机制',
  incentive_mechanism: '激励机制',
  efficiency_wage: '效率工资',
  human_capital: '人力资本',
  risk_management: '风险管理',
  cost_benefit: '成本收益',
  public_goods: '公共品理论',
  resource_allocation: '资源配置',
}

export default function FeedbackModal({ response, onDismiss, isLoading }: Props) {
  const principleLabel =
    ECON_PRINCIPLE_LABELS[response.econ_principle] ?? response.econ_principle

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-600 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 bg-indigo-900/50 text-indigo-300 rounded-full border border-indigo-700">
              第 {response.round_completed} 轮
            </span>
            <span className="text-xs px-2 py-0.5 bg-amber-900/50 text-amber-300 rounded-full border border-amber-700">
              {principleLabel}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-2">决策反馈</h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            {response.principle_explanation}
          </p>
        </div>

        {/* Immediate Effects */}
        <div className="p-6">
          {response.immediate_effects.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                立即效果
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {response.immediate_effects.map((effect) => (
                  <div
                    key={effect.metric}
                    className="flex items-center justify-between bg-slate-800 rounded-lg px-3 py-2"
                  >
                    <span className="text-slate-300 text-sm">{effect.display_name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs">{Math.round(effect.old_value)}</span>
                      <span className="text-slate-500 text-xs">→</span>
                      <span
                        className={`text-sm font-semibold ${
                          effect.delta > 0 ? 'text-emerald-400' : effect.delta < 0 ? 'text-red-400' : 'text-slate-400'
                        }`}
                      >
                        {Math.round(effect.new_value)}
                      </span>
                      <span
                        className={`text-xs ${
                          effect.delta > 0 ? 'text-emerald-400' : effect.delta < 0 ? 'text-red-400' : 'text-slate-500'
                        }`}
                      >
                        ({effect.delta > 0 ? '+' : ''}{effect.delta.toFixed(1)})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Preview */}
          {response.pending_preview.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                延迟效应预告
              </h3>
              <div className="space-y-2">
                {response.pending_preview.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 bg-amber-900/20 border border-amber-800/50 rounded-lg px-3 py-2">
                    <span className="text-amber-400 text-xs mt-0.5 flex-shrink-0">
                      ⏱ +{p.delay_rounds}轮
                    </span>
                    <span className="text-slate-300 text-sm">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Game over hint */}
          {response.state.status === 'ended' && (
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 mb-5 text-center">
              <div className="text-slate-300 font-semibold">游戏结束</div>
              <div className="text-slate-500 text-sm mt-1">点击继续查看你的执政总结</div>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={onDismiss}
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-150 ${
              isLoading
                ? 'bg-slate-700 cursor-not-allowed opacity-60'
                : 'bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99]'
            }`}
          >
            {isLoading ? '加载中...' : response.state.status === 'ended' ? '查看总结' : '继续决策'}
          </button>
        </div>
      </div>
    </div>
  )
}
