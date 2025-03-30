import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import type Application from '@/types/Application.ts'

const CLOSING_TRANSITION_TIME_MS = 400

export const useApplicationStore = defineStore('application', () => {
  const openedApps = shallowRef<Array<Application>>([])
  const requestsForClosing = ref<Array<string>>([])

  const openApp = (app: Application) => {
    const foundApp = openedApps.value.find((a) => a.name === app.name)
    if (foundApp) {
      focusApp(foundApp.name)
    } else {
      openedApps.value = [...openedApps.value, app]
    }
  }

  const closeApp = (name: string) => (openedApps.value = openedApps.value.filter((app) => app.name !== name))

  const requestCloseAllApps = () => {
    const openedAppNames = openedApps.value.map((app) => app.name)
    requestsForClosing.value = [...requestsForClosing.value, ...openedAppNames]
  }

  const focusApp = (name: string) => {
    const foundApp = openedApps.value.find((app) => app.name === name)
    if (foundApp) {
      openedApps.value = [...openedApps.value.filter((app) => app.name !== name), foundApp]
    }
  }

  const isAppFocused = (name: string) =>
    openedApps.value.length > 0 && openedApps.value[openedApps.value.length - 1].name === name

  const acceptClosingRequest = (name: string) =>
    (requestsForClosing.value = requestsForClosing.value.filter((appName) => appName !== name))

  return {
    CLOSING_TRANSITION_TIME_MS,
    openedApps,
    requestsForClosing,
    openApp,
    closeApp,
    requestCloseAllApps,
    focusApp,
    isAppFocused,
    acceptClosingRequest,
  }
})
