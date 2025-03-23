import { ref } from 'vue'
import { defineStore } from 'pinia'

const LOCALES: Array<string> = ['en-GB', 'fr-FR', 'es-ES']
const LOCAL_STORAGE_KEY: string = 'selected-locale'

export const useLocaleStore = defineStore('locale', () => {
  const selectedLocale = ref<string>(
    localStorage.getItem(LOCAL_STORAGE_KEY) ?? LOCALES[0]
  )

  const updateSelectedLocale = (newLocale: string): void => {
    if (!LOCALES.includes(newLocale)) {
      throw new Error('Locale not found')
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, newLocale)
    selectedLocale.value = newLocale
  }

  const getFlagClassFromLocale = (locale: string): string => {
    const country: string = locale.split('-')[1]?.toLocaleLowerCase()
    return `fi fi-${country}`
  }

  return {
    LOCALES,
    selectedLocale,
    updateSelectedLocale,
    getFlagClassFromLocale,
  }
})
