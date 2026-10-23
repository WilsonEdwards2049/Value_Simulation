import { useI18n } from '../i18n'
import { CHARACTERS } from '../i18n/profile/characters'
import type { PairId } from '../types/profile'

interface CharacterMatchProps {
  pairId: PairId | null
}

export default function CharacterMatch({ pairId }: CharacterMatchProps) {
  const { locale } = useI18n()

  if (!pairId) return null

  const copy = CHARACTERS[locale]
  const character = copy.characters[pairId]
  if (!character) return null

  return (
    <div className="mb-3 p-4 bg-slate-900 border border-slate-700 border-l-4 border-l-purple-500 rounded-xl">
      <div className="mb-3">
        <h4 className="text-white font-semibold">{copy.title}</h4>
        <p className="text-slate-400 text-xs">{copy.subtitle}</p>
      </div>

      <div className="mb-3">
        <div className="text-2xl font-bold text-white">{character.name}</div>
        <div className="text-slate-400 text-sm">{character.source}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="p-2.5 bg-slate-800/60 rounded-lg border-l-4 border-emerald-500">
          <div className="text-emerald-400 text-xs font-semibold mb-1">
            {copy.similarityLabel}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{character.similarity}</p>
        </div>
        <div className="p-2.5 bg-slate-800/60 rounded-lg border-l-4 border-amber-500">
          <div className="text-amber-400 text-xs font-semibold mb-1">{copy.differenceLabel}</div>
          <p className="text-slate-300 text-sm leading-relaxed">{character.difference}</p>
        </div>
      </div>
    </div>
  )
}
