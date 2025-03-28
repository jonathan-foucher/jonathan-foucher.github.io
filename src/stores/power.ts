import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePowerStore = defineStore('power', () => {
  const isTurnedOn = ref<boolean>(false)
  const isLoggedIn = ref<boolean>(false)
  const isBootingUp = ref<boolean>(false)
  const isShuttingDown = ref<boolean>(false)

  const turnOn = () => {
    isBootingUp.value = true
    isTurnedOn.value = true
  }

  const endBooting = () => {
    isBootingUp.value = false
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
    isBootingUp,
    isShuttingDown,
    turnOn,
    endBooting,
    endLoggingIn,
    startShutdown,
    endShutdown,
  }
})
