import { useState } from 'react'
import { LOCALE_LIST, getLocaleMeta, type Locale } from '../i18n/locales'
import { UI } from '../i18n/ui'
import { useLocaleStore } from '../store/localeStore'

interface Props {
  initialLocale: Locale | null
  onContinue: () => void
}

const HEADER_TITLE = 'Language · 语言 · 語言 · Sprache · 言語 · Langue · 언어 · Idioma'
const HEADER_SUBTITLE =
  'Choose your language / 选择语言 / 選擇語言 / Sprache wählen / 言語を選択 / Choisir la langue / 언어 선택 / Elige tu idioma'

export default function LanguagePicker({ initialLocale, onContinue }: Props) {
  const setLocale = useLocaleStore((s) => s.setLocale)
  const [selected, setSelected] = useState<Locale | null>(initialLocale)

  const confirm = (locale: Locale) => {
    setLocale(locale)
    onContinue()
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-snug">
            {HEADER_TITLE}
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {HEADER_SUBTITLE}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {LOCALE_LIST.map((meta) => {
            const isSelected = selected === meta.code
            return (
              <button
                key={meta.code}
                type="button"
                onClick={() => setSelected(meta.code)}
                onDoubleClick={() => confirm(meta.code)}
                className={`
                  p-5 rounded-xl border-2 text-left transition-all duration-200
                  ${isSelected
                    ? 'bg-indigo-900/40 border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                  }
                `}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xl font-bold text-white">{meta.nativeName}</div>
                    <div className="text-slate-400 text-sm mt-1">{meta.tagline}</div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-slate-500 text-xs mt-2">{meta.englishName}</div>
              </button>
            )
          })}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => selected && confirm(selected)}
            disabled={!selected}
            className={`
              px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200
              ${selected
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 active:scale-[0.98]'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }
            `}
          >
            {selected ? UI[selected].languageContinue : 'Continue · 继续 · 繼續 · Weiter'}
          </button>
          {selected && (
            <div className="text-slate-500 text-sm mt-3">
              {getLocaleMeta(selected).nativeName}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
