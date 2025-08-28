import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

const LOCAL_STORAGE_KEY: string = 'selected-locale'

export const useLocaleStore = defineStore('locale', () => {
  const i18n = useI18n()
  const { availableLocales, locale } = i18n

  const selectedLocale = ref<string>(localStorage.getItem(LOCAL_STORAGE_KEY) ?? availableLocales[0] ?? '')
  locale.value = selectedLocale.value

  const updateSelectedLocale = (newLocale: string): void => {
    if (!availableLocales.includes(newLocale)) {
      throw new Error('Locale not found')
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, newLocale)
    selectedLocale.value = newLocale
    locale.value = newLocale
  }

  const getFlagClassFromLocale = (locale: string): string => {
    const country: string = locale.split('-')[1]?.toLocaleLowerCase() ?? ''
    return `fi fi-${country}`
  }

  return {
    LOCALES: availableLocales,
    selectedLocale,
    updateSelectedLocale,
    getFlagClassFromLocale,
  }
})
