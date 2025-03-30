import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

const AUDIO_DISABLED_LOCAL_STORAGE_KEY: string = 'audio-disabled'
const VOLUME_VALUE_LOCAL_STORAGE_KEY: string = 'volume-value'
const DEFAULT_VOLUME_VALUE: number = 0.8

export const useVolumeStore = defineStore('volume', () => {
  const getInitialAudioDisabledValue = (): boolean => {
    const localStorageValue: string | null = localStorage.getItem(AUDIO_DISABLED_LOCAL_STORAGE_KEY)
    return localStorageValue?.toLocaleLowerCase() === 'true'
  }

  const checkVolumeValue = (value: number, throwError: boolean = true): number => {
    if (value < 0 || value > 1) {
      if (throwError) {
        throw new Error(`Wrong volume value: ${value}`)
      }
      return DEFAULT_VOLUME_VALUE
    }
    return value
  }

  const getInitialVolumeValue = (): number => {
    return checkVolumeValue(Number(localStorage.getItem(VOLUME_VALUE_LOCAL_STORAGE_KEY) ?? DEFAULT_VOLUME_VALUE), false)
  }

  const volumeValue = ref<number>(getInitialVolumeValue())
  const audioDisabled = ref<boolean>(getInitialAudioDisabledValue())

  const volumeIcon = computed<string>(() => {
    if (audioDisabled.value) {
      return 'volume_off'
    }
    if (volumeValue.value === 0.0) {
      return 'volume_mute'
    }
    if (volumeValue.value < 0.5) {
      return 'volume_down'
    }
    return 'volume_up'
  })

  const toggleDisabledAudio = () => (audioDisabled.value = !audioDisabled.value)

  watch(audioDisabled, (newValue) => {
    localStorage.setItem(AUDIO_DISABLED_LOCAL_STORAGE_KEY, String(newValue))
  })

  watch(volumeValue, (newValue) => {
    if (audioDisabled.value) {
      audioDisabled.value = false
    }
    checkVolumeValue(newValue)
    localStorage.setItem(VOLUME_VALUE_LOCAL_STORAGE_KEY, newValue.toFixed(2))
    volumeValue.value = newValue
  })

  const volumeOutput = computed((): number => (audioDisabled.value ? 0 : volumeValue.value))

  return {
    audioDisabled,
    volumeValue,
    volumeIcon,
    toggleDisabledAudio,
    volumeOutput,
  }
})
