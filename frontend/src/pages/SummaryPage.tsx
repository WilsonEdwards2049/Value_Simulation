import { useNavigate } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { useGameStore } from '../store/gameStore'

const IDENTITY_NAMES: Record<string, string> = {
  small_company: '小公司老板',
  tech_giant: '头部科技公司老板',
  mayor: '市长',
  small_nation: '小国元首',
  superpower: '大国元首',
}

const GRADE_COLORS: Record<string, string> = {
  S: 'text-yellow-300',
  A: 'text-green-400',
  B: 'text-blue-400',
  C: 'text-orange-400',
  D: 'text-red-400',
  F: 'text-red-600',
}

const GRADE_BG: Record<string, string> = {
  S: 'bg-yellow-900/30 border-yellow-700',
  A: 'bg-green-900/30 border-green-700',
  B: 'bg-blue-900/30 border-blue-700',
  C: 'bg-orange-900/30 border-orange-700',
  D: 'bg-red-900/30 border-red-700',
  F: 'bg-red-900/50 border-red-900',
}

const LINE_COLORS = [
  '#60a5fa', '#34d399', '#f59e0b', '#a78bfa',
  '#f87171', '#2dd4bf', '#fb923c', '#e879f9',
]

export default function SummaryPage() {
  const { summary, resetGame } = useGameStore()
  const navigate = useNavigate()

  if (!summary) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">加载总结中...</div>
      </div>
    )
  }

  const identityName = IDENTITY_NAMES[summary.identity] ?? summary.identity
  const gradeColor = GRADE_COLORS[summary.grade] ?? 'text-slate-300'
  const gradeBg = GRADE_BG[summary.grade] ?? 'bg-slate-800 border-slate-600'

  // Prepare chart data
  const metricKeys = Object.keys(summary.final_metrics)
  const chartData = summary.metric_history.map((snap) => {
    const point: Record<string, number> = { round: snap.round as number }
    metricKeys.forEach((k) => {
      if (snap[k] !== undefined) point[k] = snap[k] as number
    })
    return point
  })

  const handleRestart = () => {
    resetGame()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">执政总结</h1>
          <p className="text-slate-400">
            {identityName} · 共 {summary.total_rounds} 轮决策
          </p>
        </div>

        {/* Grade Card */}
        <div className={`rounded-2xl border-2 p-8 mb-8 text-center ${gradeBg}`}>
          <div className={`text-8xl font-bold ${gradeColor} mb-3`}>
            {summary.grade}
          </div>
          <div className="text-white text-2xl font-semibold mb-2">
            综合评分：{summary.overall_score}
          </div>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
            {summary.comment}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Metric History Chart */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 lg:col-span-2">
            <h2 className="text-slate-300 font-semibold mb-4">指标变化轨迹</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="round"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    label={{ value: '轮次', position: 'insideBottom', offset: -2, fill: '#64748b' }}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                    formatter={(value) => summary.final_metrics[value]?.display_name ?? value}
                  />
                  {metricKeys.map((key, i) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={LINE_COLORS[i % LINE_COLORS.length]}
                      strokeWidth={2}
                      dot={false}
                      name={key}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-500 text-center py-8">暂无轨迹数据</div>
            )}
          </div>

          {/* Final Metrics */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
            <h2 className="text-slate-300 font-semibold mb-4">最终指标</h2>
            <div className="space-y-3">
              {Object.entries(summary.final_metrics).map(([key, metric]) => {
                const score = summary.scores[key] ?? metric.normalized
                const color =
                  score >= 70 ? 'text-emerald-400' : score >= 40 ? 'text-amber-400' : 'text-red-400'
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">{metric.display_name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-700 rounded-full">
                        <div
                          className={`h-1.5 rounded-full ${
                            score >= 70 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className={`text-sm font-semibold ${color}`}>
                        {Math.round(score)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Key Decisions */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
            <h2 className="text-slate-300 font-semibold mb-4">关键决策</h2>
            {summary.key_decisions.length > 0 ? (
              <div className="space-y-3">
                {summary.key_decisions.map((decision, i) => (
                  <div key={i} className="bg-slate-800/60 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500">第 {decision.round} 轮</span>
                      <span className="text-slate-300 text-sm font-medium">{decision.title}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{decision.choice}</p>
                    <div className="text-xs text-amber-500 mt-1">
                      影响力指数: {decision.impact.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-sm">暂无关键决策记录</div>
            )}
          </div>
        </div>

        {/* Restart Button */}
        <div className="text-center">
          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-150 active:scale-[0.98]"
          >
            再玩一次
          </button>
        </div>
      </div>
    </div>
  )
}
