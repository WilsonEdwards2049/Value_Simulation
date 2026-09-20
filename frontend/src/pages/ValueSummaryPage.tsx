import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useValueStore } from '../store/valueStore'

export default function ValueSummaryPage() {
  const navigate = useNavigate()
  const { summary, isLoading, loadSummary, reset } = useValueStore()

  useEffect(() => {
    if (!summary) {
      loadSummary()
    }
  }, [])

  if (isLoading || !summary) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">正在生成你的价值观谱系...</div>
      </div>
    )
  }

  const topValue = summary.ranking[0]
  const bottomValue = summary.ranking[summary.ranking.length - 1]

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">你的价值观谱系</h1>
          <p className="text-slate-400">
            完成了 {summary.total_comparisons} 次比较，调整了 {summary.adjustments_made} 次选择
          </p>
        </div>

        {/* Top Card */}
        <div className="mb-8 p-8 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-2 border-indigo-500 rounded-2xl">
          <div className="text-center mb-4">
            <div className="inline-block px-4 py-1.5 bg-indigo-500/30 rounded-full border border-indigo-400 mb-3">
              <span className="text-indigo-300 text-sm font-semibold">最高优先级</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-2">{topValue.value.name}</h2>
            <p className="text-slate-300 text-lg">{topValue.value.description}</p>
          </div>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-400">{topValue.win_count}</div>
              <div className="text-slate-400 text-sm">胜场</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">{topValue.loss_count}</div>
              <div className="text-slate-400 text-sm">败场</div>
            </div>
          </div>
        </div>

        {/* Ranking List */}
        <div className="mb-8 bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-white font-semibold text-xl mb-4">完整排序</h3>
          <div className="space-y-2">
            {summary.ranking.map((item) => (
              <div
                key={item.value.id}
                className="flex items-center gap-4 p-4 bg-slate-800/60 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{item.rank}</span>
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{item.value.name}</div>
                  <div className="text-slate-400 text-sm">{item.value.description}</div>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="text-emerald-400">
                    {item.win_count}胜
                  </span>
                  <span className="text-red-400">
                    {item.loss_count}败
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div className="mb-8 bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-white font-semibold text-xl mb-4">价值观分析</h3>
          <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
            {summary.analysis}
          </p>
        </div>

        {/* Key Conflicts */}
        {summary.key_conflicts.length > 0 && (
          <div className="mb-8 bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold text-xl mb-4">关键抉择时刻</h3>
            <div className="space-y-3">
              {summary.key_conflicts.map((conflict, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-800/60 rounded-lg border-l-4 border-amber-500"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-400 font-semibold">
                      {conflict.value_a} vs {conflict.value_b}
                    </span>
                    {conflict.adjusted && (
                      <span className="px-2 py-0.5 text-xs bg-amber-900/40 text-amber-300 rounded">
                        调整后选择
                      </span>
                    )}
                  </div>
                  <div className="text-slate-400 text-sm">
                    最终选择: <span className="text-indigo-400">{conflict.winner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Value */}
        <div className="mb-8 p-6 bg-slate-900/60 border border-slate-700 rounded-xl">
          <div className="text-center">
            <div className="inline-block px-4 py-1.5 bg-slate-800 rounded-full border border-slate-600 mb-2">
              <span className="text-slate-400 text-sm">相对优先级较低</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-300 mb-1">{bottomValue.value.name}</h3>
            <p className="text-slate-500 text-sm">{bottomValue.value.description}</p>
          </div>
        </div>

        {/* Restart Button */}
        <div className="text-center">
          <button
            onClick={() => {
              reset()
              navigate('/')
            }}
            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]"
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  )
}
