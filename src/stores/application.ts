import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import type Application from '@/types/Application.ts'

export const useApplicationStore = defineStore('application', () => {
  const openedApps = shallowRef<Array<Application>>([])

  const openApp = (app: Application) => {
    const foundApp = openedApps.value.find((a) => a.name === app.name)
    if (foundApp) {
      focusApp(foundApp.name)
    } else {
      openedApps.value = [...openedApps.value, app]
    }
  }

  const closeApp = (name: string) => {
    openedApps.value = openedApps.value.filter((app) => app.name !== name)
  }

  const focusApp = (name: string) => {
    const foundApp = openedApps.value.find((app) => app.name === name)
    if (foundApp) {
      openedApps.value = [...openedApps.value.filter((app) => app.name !== name), foundApp]
    }
  }

  const isAppFocused = (name: string) =>
    openedApps.value.length > 0 && openedApps.value[openedApps.value.length - 1].name === name

  return {
    openedApps,
    openApp,
    closeApp,
    focusApp,
    isAppFocused,
  }
})
