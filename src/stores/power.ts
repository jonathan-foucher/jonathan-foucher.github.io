import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePowerStore = defineStore('power', () => {
  const isTurnedOn = ref<boolean>(false)
  const isLoggedIn = ref<boolean>(false)
  const isBooting = ref<boolean>(false)
  const isShuttingDown = ref<boolean>(false)

  const turnOn = () => {
    isBooting.value = true
    isTurnedOn.value = true
  }

  const endBooting = () => {
    isBooting.value = false
  }

  const endLoggingIn = () => {
    isLoggedIn.value = true
  }

  const startShutdown = () => {
    isShuttingDown.value = true
    isLoggedIn.value = false
  }

  const endShutdown = () => {
    isTurnedOn.value = false
    isShuttingDown.value = false
  }

  return {
    isTurnedOn,
    isLoggedIn,
    isBooting,
    isShuttingDown,
    turnOn,
    endBooting,
    endLoggingIn,
    startShutdown,
    endShutdown,
  }
})
