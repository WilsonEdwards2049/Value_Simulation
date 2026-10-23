import { useLocaleStore } from '../store/localeStore'
import { DEFAULT_LOCALE, getLocaleMeta, type Locale } from './locales'
import { UI, type UIStrings } from './ui'

type StringKeys = {
  [K in keyof UIStrings]: UIStrings[K] extends string ? K : never
}[keyof UIStrings]

export function format(
  template: string,
  params?: Record<string, string | number>
): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    params[key] !== undefined ? String(params[key]) : match
  )
}

export function translate(
  locale: Locale,
  key: StringKeys,
  params?: Record<string, string | number>
): string {
  return format(UI[locale][key], params)
}

/** 供引擎等非 React 代码使用，读取当前选择的语言。 */
export function getActiveLocale(): Locale {
  return useLocaleStore.getState().locale ?? DEFAULT_LOCALE
}

export function t(key: StringKeys, params?: Record<string, string | number>): string {
  return translate(getActiveLocale(), key, params)
}

export function buildAnalysis(
  locale: Locale,
  topId: string,
  bottomId: string,
  topName: string,
  bottomName: string
): string {
  const strings = UI[locale]
  return (
    format(strings.analysisIntro, { top: topName, bottom: bottomName }) +
    (strings.analysisByValue[topId] ?? '')
  )
}

export function useI18n() {
  const locale = useLocaleStore((s) => s.locale) ?? DEFAULT_LOCALE
  return {
    locale,
    meta: getLocaleMeta(locale),
    ui: UI[locale],
    t: (key: StringKeys, params?: Record<string, string | number>) =>
      translate(locale, key, params),
  }
}

export { DEFAULT_LOCALE }
export type { Locale }

/** 去掉 Markdown 粗体标记，用于纯文本展示。 */
export function stripMarkdownBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1')
}
