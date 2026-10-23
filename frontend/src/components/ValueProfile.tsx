import type { ValueSummaryResponse } from '../types/values'
import { format, useI18n } from '../i18n'
import { PROFILE } from '../i18n/profile'
import { deriveProfile } from '../engine/profile'
import { getValueById } from '../engine/data'
import ValueRadar, { type RadarDatum } from './ValueRadar'

interface ValueProfileProps {
  summary: ValueSummaryResponse
}

export default function ValueProfile({ summary }: ValueProfileProps) {
  const { locale } = useI18n()
  const copy = PROFILE[locale]
  const profile = deriveProfile(summary)

  if (!profile.topId) return null

  const archetype = copy.archetypes[profile.topId]
  const secondValue = profile.secondId ? getValueById(profile.secondId) : undefined
  const secondName =
    secondValue?.name ?? (profile.secondId ? copy.radarLabels[profile.secondId] : '')
  const tension = profile.secondId ? copy.tensions[profile.secondId] : null
  const adjustmentLabel = copy.adjustmentLabels[profile.adjustmentLevel]
  const adjustmentDescription = copy.adjustmentDescriptions[profile.adjustmentLevel]

  const radarData: RadarDatum[] = profile.radar.map((item) => {
    const value = getValueById(item.valueId)
    return {
      ...item,
      name: copy.radarLabels[item.valueId],
      fullName: value?.name ?? copy.radarLabels[item.valueId],
    }
  })

  return (
    <section className="mb-3">
      <div className="text-center mb-3">
        <h2 className="text-2xl font-bold text-white mb-1">{copy.sectionTitle}</h2>
        <p className="text-slate-400 text-sm">{copy.sectionSubtitle}</p>
      </div>

      <div className="mb-3 p-4 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-2 border-indigo-500 rounded-2xl">
        <div className="text-center">
          <div className="inline-block px-4 py-1.5 bg-indigo-500/30 rounded-full border border-indigo-400 mb-3">
            <span className="text-indigo-300 text-sm font-semibold">{copy.archetypeLabel}</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{archetype.name}</h3>
          <p className="text-indigo-200 text-sm mb-2">{archetype.tagline}</p>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto">
            {archetype.description}
          </p>
          <span className="inline-block mt-3 px-3 py-1 text-xs bg-slate-950/40 text-indigo-200 rounded-full border border-indigo-500/50">
            {copy.adjustmentTitle} · {adjustmentLabel}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-2">{copy.strengthsLabel}</h4>
          <div className="space-y-1.5 mb-3">
            {archetype.strengths.map((strength) => (
              <div key={strength} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>{strength}</span>
              </div>
            ))}
          </div>
          <div className="p-2.5 bg-slate-800/60 rounded-lg border-l-4 border-amber-500 mb-2">
            <div className="text-amber-400 text-xs font-semibold mb-1">{copy.blindSpotLabel}</div>
            <p className="text-slate-300 text-sm leading-relaxed">{archetype.blindSpot}</p>
          </div>
          <div>
            <div className="text-slate-400 text-xs font-semibold mb-1">
              {copy.decisionStyleLabel}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{archetype.decisionStyle}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-2">{copy.tensionTitle}</h4>
          {tension && secondName && (
            <>
              <div className="text-indigo-300 font-semibold mb-2">
                {format(copy.tensionBetween, {
                  archetype: archetype.name,
                  second: secondName,
                })}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{tension}</p>
            </>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-1">
            {profile.useBars ? copy.barsTitle : copy.radarTitle}
          </h4>
          <p className="text-slate-400 text-xs mb-3">{copy.radarCaption}</p>
          <ValueRadar
            data={radarData}
            useBars={profile.useBars}
            ariaLabel={copy.radarTitle}
          />
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-1">{copy.adjustmentTitle}</h4>
          <div className="inline-block mt-2 mb-2 px-3 py-1 text-xs bg-indigo-900/40 text-indigo-300 rounded-full border border-indigo-500/40">
            {adjustmentLabel}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{adjustmentDescription}</p>
        </div>
      </div>
    </section>
  )
}
