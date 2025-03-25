import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const WIFI_ENABLED_LOCAL_STORAGE_KEY: string = 'wifi-enabled'

export const useWifiStore = defineStore('wifi', () => {
  const getInitialWifiEnabledValue = (): boolean => {
    const localStorageValue: string | null = localStorage.getItem(WIFI_ENABLED_LOCAL_STORAGE_KEY)
    return localStorageValue === null || localStorageValue.toLocaleLowerCase() === 'true'
  }

  const wifiEnabled = ref<boolean>(getInitialWifiEnabledValue())

  watch(wifiEnabled, (newValue) => {
    localStorage.setItem(WIFI_ENABLED_LOCAL_STORAGE_KEY, String(newValue))
  })

  return {
    wifiEnabled,
  }
})
