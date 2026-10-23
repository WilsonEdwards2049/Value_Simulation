import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VALUE_COUNT } from '../engine/data'
import { useI18n } from '../i18n'
import { getLocaleMeta } from '../i18n/locales'
import { useLocaleStore } from '../store/localeStore'
import LanguagePicker from '../components/LanguagePicker'

export default function HomePage() {
  const navigate = useNavigate()
  const locale = useLocaleStore((s) => s.locale)
  const { t } = useI18n()
  const [showPicker, setShowPicker] = useState(false)

  if (!locale || showPicker) {
    return (
      <LanguagePicker
        initialLocale={locale}
        onContinue={() => setShowPicker(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full relative">
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="absolute -top-12 right-0 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
        >
          {getLocaleMeta(locale).nativeName} · {t('languageChange')}
        </button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">{t('appTitle')}</h1>
          <p className="text-slate-400 text-lg">{t('homeSubtitle')}</p>
        </div>

        <div className="max-w-md mx-auto">
          {/* 价值观排序游戏 */}
          <button
            onClick={() => navigate('/values')}
            className="group p-8 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-2 border-indigo-500/50 rounded-2xl hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
          >
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-4xl">⚖️</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{t('homeGameTitle')}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {t('homeGameDesc', { n: VALUE_COUNT })}
              </p>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-indigo-400">✓</span>
                <span>{t('homeBullet1')}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-indigo-400">✓</span>
                <span>{t('homeBullet2')}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-indigo-400">✓</span>
                <span>{t('homeBullet3')}</span>
              </div>
            </div>
            <div className="mt-6 text-indigo-400 font-semibold group-hover:text-indigo-300">
              {t('homeStart')}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
