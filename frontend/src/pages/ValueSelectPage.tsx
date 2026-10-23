import { useEffect, useState } from 'react'
import { useValueStore } from '../store/valueStore'
import type { ValueInfo } from '../types/values'
import { useI18n } from '../i18n'

export default function ValueSelectPage() {
  const { t } = useI18n()
  const {
    availableValues,
    selectedValues,
    isLoading,
    error,
    startGame,
    selectValues
  } = useValueStore()

  const [localSelected, setLocalSelected] = useState<string[]>([])

  useEffect(() => {
    if (availableValues.length === 0) {
      startGame()
    }
  }, [])

  const toggleValue = (valueId: string) => {
    if (localSelected.includes(valueId)) {
      setLocalSelected(localSelected.filter(id => id !== valueId))
    } else {
      setLocalSelected([...localSelected, valueId])
    }
  }

  const canSubmit = localSelected.length >= 2

  const handleSubmit = () => {
    if (canSubmit) {
      selectValues(localSelected)
    }
  }

  if (isLoading && availableValues.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">{t('loading')}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">{t('selectTitle')}</h1>
          <p className="text-slate-400 text-lg mb-2">
            {t('selectSubtitle', { n: availableValues.length })}
          </p>
          <p className="text-slate-500 text-sm">
            {t('selectHint')}
          </p>
        </div>

        {/* Selection Count */}
        <div className="text-center mb-6">
          <div className="inline-block px-6 py-3 bg-slate-900/60 border border-slate-700 rounded-xl">
            <span className="text-slate-400 text-sm">{t('selectedLabel')}</span>
            <span className={`text-2xl font-bold ml-2 ${
              canSubmit ? 'text-indigo-400' : 'text-slate-500'
            }`}>
              {localSelected.length}
            </span>
            <span className="text-slate-500 text-sm">/2-{availableValues.length}</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {availableValues.map((value) => {
            const isSelected = localSelected.includes(value.id)
            return (
              <button
                key={value.id}
                onClick={() => toggleValue(value.id)}
                className={`
                  p-5 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer
                  ${isSelected
                    ? 'bg-indigo-900/40 border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{value.name}</h3>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-slate-400 text-sm mb-3 leading-relaxed">
                  {value.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {value.examples.slice(0, 3).map((example, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs bg-slate-800/60 text-slate-400 rounded"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            className={`
              px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200
              ${canSubmit && !isLoading
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 active:scale-[0.98]'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }
            `}
          >
            {isLoading ? t('preparing') : canSubmit ? t('startCompare') : t('selectAtLeast', { n: 2 - localSelected.length })}
          </button>
        </div>
      </div>
    </div>
  )
}
