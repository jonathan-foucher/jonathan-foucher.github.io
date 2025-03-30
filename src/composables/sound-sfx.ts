import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useVolumeStore } from '@/stores/volume.ts'
import LoginSfx from '@/assets/sound-sfx/login.mp3'
import MouseClickSfx from '@/assets/sound-sfx/mouse-click.mp3'
import NotificationSfx from '@/assets/sound-sfx/notification.mp3'

export function useSoundSfx() {
  const audio = new Audio()

  const volumeStore = useVolumeStore()
  const { volumeOutput } = storeToRefs(volumeStore)
  audio.volume = volumeOutput.value

  const playAudio = (sfx: string): void => {
    audio.src = sfx
    audio.play()
  }

  const playLoginSfx = (): void => playAudio(LoginSfx)
  const playMouseClickSfx = (): void => playAudio(MouseClickSfx)
  const playNotificationSfx = (): void => playAudio(NotificationSfx)

  watch(volumeOutput, (newValue) => (audio.volume = newValue))

  return {
    playLoginSfx,
    playMouseClickSfx,
    playNotificationSfx,
  }
}
