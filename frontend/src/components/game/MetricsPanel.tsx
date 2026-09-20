import type { MetricValue } from '../../types/game'

interface Props {
  metrics: Record<string, MetricValue>
}

function TrendArrow({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <span className="text-emerald-400 font-bold">↑</span>
  if (trend === 'down') return <span className="text-red-400 font-bold">↓</span>
  return <span className="text-slate-500">→</span>
}

function MetricBar({ value }: { value: number }) {
  const color =
    value >= 70 ? 'bg-emerald-500' : value >= 40 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${Math.max(2, value)}%` }}
      />
    </div>
  )
}

export default function MetricsPanel({ metrics }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 h-full overflow-y-auto">
      <h2 className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-4">
        核心指标
      </h2>
      <div className="space-y-4">
        {Object.values(metrics).map((metric) => (
          <div key={metric.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-300 text-sm">{metric.display_name}</span>
              <div className="flex items-center gap-1.5">
                <TrendArrow trend={metric.trend} />
                <span className="text-white font-mono text-sm font-semibold">
                  {Math.round(metric.normalized)}
                </span>
              </div>
            </div>
            <MetricBar value={metric.normalized} />
            <div className="text-slate-500 text-xs mt-0.5">
              {metric.value.toLocaleString('zh-CN', { maximumFractionDigits: 1 })} {metric.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
