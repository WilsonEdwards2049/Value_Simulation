import type { Locale } from '../../locales'
import type { ValueTypeContent } from '../../../types/profile'
import zhCN from './zh-CN'
import zhTW from './zh-TW'
import en from './en'
import de from './de'
import ja from './ja'
import fr from './fr'
import ko from './ko'
import es from './es'

export const VALUE_TYPES: Record<Locale, ValueTypeContent> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  en,
  de,
  ja,
  fr,
  ko,
  es,
}
