<script setup lang="ts">
import { ref } from 'vue'
import AppWindow from '@/components/AppWindow.vue'
import type Application from '@/types/Application.ts'
import { useRedirection } from '@/composables/redirection.ts'
import DesktopIcon from '@/components/DesktopIcon.vue'

const openedApps = ref<Array<Application>>([{ name: 'some-app' }, { name: 'some-other-app' }])

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

const { GITHUB_PROFILE_URL, openInNewTab } = useRedirection()
</script>

<template>
  <desktop-icon
    icon-path="/icons/github.svg"
    icon-text="GitHub profile"
    :action="() => openInNewTab(GITHUB_PROFILE_URL)"
  />
  <app-window
    v-for="app in openedApps"
    :key="app.name"
    :name="app.name"
    :close-app="closeApp"
    :focus-app="focusApp"
    :is-app-focused="isAppFocused"
  />
</template>
