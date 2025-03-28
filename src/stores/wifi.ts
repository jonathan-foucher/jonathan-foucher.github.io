import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const WIFI_ENABLED_LOCAL_STORAGE_KEY: string = 'wifi-enabled'
const ROUTER_NAME: string = 'jf‑rtr‑x01'
const WIFI_LOADING_TIME_MS: number = 3000

export const useWifiStore = defineStore('wifi', () => {
  const { t } = useI18n()
  const { notify } = useQuasar()

  const getInitialWifiEnabledValue = (): boolean => {
    const localStorageValue: string | null = localStorage.getItem(WIFI_ENABLED_LOCAL_STORAGE_KEY)
    return localStorageValue === null || localStorageValue.toLocaleLowerCase() === 'true'
  }

  const wifiEnabled = ref<boolean>(getInitialWifiEnabledValue())
  const wifiLoading = ref<boolean>(false)
  const wifiLoadingTimeout = ref<number | undefined>(undefined)

  const notifyWifiSuccess = () =>
    notify({
      position: 'bottom-right',
      timeout: 2500,
      color: 'positive',
      textColor: 'black',
      message: t('wifi-icon.wifi-network'),
      caption: t('wifi-icon.connected-to-router', { router_name: ROUTER_NAME }),
      actions: [{ icon: 'close', rounded: true, dense: true, color: 'black' }],
    })

  watch(wifiEnabled, (newValue) => {
    localStorage.setItem(WIFI_ENABLED_LOCAL_STORAGE_KEY, String(newValue))

    if (newValue) {
      wifiLoading.value = true
      clearTimeout(wifiLoadingTimeout.value)

      wifiLoadingTimeout.value = setTimeout(() => {
        wifiLoading.value = false
        notifyWifiSuccess()
      }, WIFI_LOADING_TIME_MS)
    } else {
      clearTimeout(wifiLoadingTimeout.value)
      wifiLoading.value = false
    }
  })

  return {
    ROUTER_NAME,
    wifiEnabled,
    wifiLoading,
  }
})
