import type { ProfileRadarDatum } from '../types/profile'

export interface RadarDatum extends ProfileRadarDatum {
  name: string
  fullName: string
}

interface ValueRadarProps {
  data: RadarDatum[]
  useBars: boolean
  ariaLabel: string
}

const CX = 230
const CY = 172
const R = 108
const LABEL_R = R + 28
const RINGS = [0.25, 0.5, 0.75, 1]

function truncateLabel(label: string, max = 15): string {
  const chars = [...label]
  return chars.length <= max ? label : `${chars.slice(0, max - 1).join('')}…`
}

export default function ValueRadar({ data, useBars, ariaLabel }: ValueRadarProps) {
  if (useBars || data.length < 3) {
    return (
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.valueId}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-300">{item.fullName}</span>
              <span className="text-indigo-300">{item.strength}%</span>
            </div>
            <div
              className="h-2 bg-slate-800 rounded-full overflow-hidden"
              role="img"
              aria-label={`${item.fullName}: ${item.strength}%`}
            >
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${item.strength}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const angles = data.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / data.length)
  const pointAt = (index: number, fraction: number) => {
    const angle = angles[index]
    return {
      x: CX + R * fraction * Math.cos(angle),
      y: CY + R * fraction * Math.sin(angle),
    }
  }
  const toPoints = (points: Array<{ x: number; y: number }>) =>
    points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  const ringPoints = RINGS.map((fraction) =>
    toPoints(data.map((_, i) => pointAt(i, fraction)))
  )
  const dataPoints = data.map((item, i) => pointAt(i, item.strength / 100))

  return (
    <svg
      viewBox="0 0 460 360"
      className="w-full h-auto max-w-md mx-auto"
      role="img"
      aria-label={ariaLabel}
    >
      {ringPoints.map((points, i) => (
        <polygon key={i} points={points} fill="none" stroke="#334155" strokeWidth={1} />
      ))}
      {angles.map((angle, i) => {
        const end = pointAt(i, 1)
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={end.x}
            y2={end.y}
            stroke="#475569"
            strokeWidth={1}
          />
        )
      })}
      <polygon
        points={toPoints(dataPoints)}
        fill="rgba(99,102,241,0.35)"
        stroke="#818cf8"
        strokeWidth={2}
      />
      {dataPoints.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r={3} fill="#c7d2fe" />
      ))}
      {data.map((item, i) => {
        const angle = angles[i]
        const cos = Math.cos(angle)
        const x = CX + LABEL_R * Math.cos(angle)
        const y = CY + LABEL_R * Math.sin(angle)
        const anchor = Math.abs(cos) < 0.1 ? 'middle' : cos > 0 ? 'start' : 'end'
        return (
          <text
            key={item.valueId}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={11}
            fill="#cbd5e1"
          >
            <title>{item.fullName}</title>
            {truncateLabel(item.name)}
          </text>
        )
      })}
    </svg>
  )
}
