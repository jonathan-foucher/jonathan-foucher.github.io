import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const DISABLED_AUDIO_LOCAL_STORAGE_KEY: string = 'audio-disabled'
const VOLUME_LOCAL_STORAGE_KEY: string = 'selected-volume'
const DEFAULT_VOLUME_VALUE: number = 0.8

export const useVolumeStore = defineStore('volume', () => {
  const getInitialDisabledAudioValue = (): boolean => {
    const localStorageValue: string | null = localStorage.getItem(
      DISABLED_AUDIO_LOCAL_STORAGE_KEY
    )
    return !(
      localStorageValue === null ||
      localStorageValue.toLocaleLowerCase() === 'false'
    )
  }

  const checkVolumeValue = (
    value: number,
    throwError: boolean = true
  ): number => {
    if (value < 0 || value > 1) {
      if (throwError) {
        throw new Error(`Wrong volume value: ${value}`)
      }
      return DEFAULT_VOLUME_VALUE
    }
    return value
  }

  const getInitialVolumeValue = (): number => {
    return checkVolumeValue(
      Number(
        localStorage.getItem(VOLUME_LOCAL_STORAGE_KEY) ?? DEFAULT_VOLUME_VALUE
      ),
      false
    )
  }

  const selectedVolume = ref<number>(getInitialVolumeValue())
  const disabledAudio = ref<boolean>(getInitialDisabledAudioValue())

  const volumeIcon = computed<string>(() => {
    if (disabledAudio.value) {
      return 'volume_off'
    }
    if (selectedVolume.value === 0.0) {
      return 'volume_mute'
    }
    if (selectedVolume.value < 0.5) {
      return 'volume_down'
    }
    return 'volume_up'
  })

  const toggleDisabledAudio = (): void => {
    localStorage.setItem(
      DISABLED_AUDIO_LOCAL_STORAGE_KEY,
      String(!disabledAudio.value)
    )
    disabledAudio.value = !disabledAudio.value
  }

  const updateSelectedVolume = (newValue: number): void => {
    if (disabledAudio.value) {
      toggleDisabledAudio()
    }
    checkVolumeValue(newValue)
    localStorage.setItem(VOLUME_LOCAL_STORAGE_KEY, newValue.toFixed(2))
    selectedVolume.value = newValue
  }

  return {
    disabledAudio,
    selectedVolume,
    volumeIcon,
    toggleDisabledAudio,
    updateSelectedVolume,
  }
})
