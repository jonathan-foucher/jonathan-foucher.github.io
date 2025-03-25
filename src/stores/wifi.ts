import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const WIFI_ENABLED_LOCAL_STORAGE_KEY: string = 'wifi-enabled'
const WIFI_LOADING_TIME_MS: number = 3000

export const useWifiStore = defineStore('wifi', () => {
  const getInitialWifiEnabledValue = (): boolean => {
    const localStorageValue: string | null = localStorage.getItem(WIFI_ENABLED_LOCAL_STORAGE_KEY)
    return localStorageValue === null || localStorageValue.toLocaleLowerCase() === 'true'
  }

  const wifiEnabled = ref<boolean>(getInitialWifiEnabledValue())
  const wifiLoading = ref<boolean>(false)
  const wifiLoadingTimeout = ref<number | undefined>(undefined)

  watch(wifiEnabled, (newValue) => {
    localStorage.setItem(WIFI_ENABLED_LOCAL_STORAGE_KEY, String(newValue))

    if (newValue) {
      wifiLoading.value = true
      clearTimeout(wifiLoadingTimeout.value)
      wifiLoadingTimeout.value = setTimeout(() => (wifiLoading.value = false), WIFI_LOADING_TIME_MS)
    } else {
      clearTimeout(wifiLoadingTimeout.value)
      wifiLoading.value = false
    }
  })

  return {
    wifiEnabled,
    wifiLoading,
  }
})
