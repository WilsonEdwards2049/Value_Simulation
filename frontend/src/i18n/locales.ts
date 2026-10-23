export const LOCALES = ['zh-CN', 'zh-TW', 'en', 'de', 'ja', 'fr', 'ko', 'es'] as const

export type Locale = (typeof LOCALES)[number]

export interface LocaleMeta {
  code: Locale
  /** 用该语言自身文字显示的名称 */
  nativeName: string
  /** 英文名称，供辅助识别 */
  englishName: string
  /** 选择卡上的一句介绍 */
  tagline: string
  htmlLang: string
}

export const LOCALE_LIST: LocaleMeta[] = [
  { code: 'zh-CN', nativeName: '简体中文', englishName: 'Simplified Chinese', tagline: '用简体中文游玩', htmlLang: 'zh-CN' },
  { code: 'zh-TW', nativeName: '繁體中文', englishName: 'Traditional Chinese', tagline: '以繁體中文遊玩', htmlLang: 'zh-TW' },
  { code: 'en', nativeName: 'English', englishName: 'English', tagline: 'Play in English', htmlLang: 'en' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', tagline: 'Auf Deutsch spielen', htmlLang: 'de' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', tagline: '日本語でプレイ', htmlLang: 'ja' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', tagline: 'Jouer en français', htmlLang: 'fr' },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean', tagline: '한국어로 플레이', htmlLang: 'ko' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', tagline: 'Jugar en español', htmlLang: 'es' },
]

export const DEFAULT_LOCALE: Locale = 'zh-CN'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

export function getLocaleMeta(locale: Locale): LocaleMeta {
  return LOCALE_LIST.find((item) => item.code === locale) ?? LOCALE_LIST[0]
}
