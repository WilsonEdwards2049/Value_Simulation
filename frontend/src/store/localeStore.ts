import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale } from '../i18n/locales'

interface LocaleState {
  locale: Locale | null
  setLocale: (locale: Locale) => void
  clearLocale: () => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: null,
      setLocale: (locale) => set({ locale }),
      clearLocale: () => set({ locale: null }),
    }),
    { name: 'value-sim-locale-v1' }
  )
)
