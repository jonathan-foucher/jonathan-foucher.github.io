<script setup lang="ts">
import { ref } from 'vue'
import AppWindow from '@/components/AppWindow.vue'
import type Application from '@/types/Application.ts'
import { useRedirection } from '@/composables/redirection.ts'
import DesktopIcon from '@/components/DesktopIcon.vue'
import type DesktopIconType from '@/types/DesktopIcon.ts'

const { GITHUB_PROFILE_URL, ROOT_ME_PROFILE_URL, LINKED_IN_PROFILE_URL, openInNewTab } = useRedirection()

const desktopIcons: Array<Array<DesktopIconType>> = [
  [
    {
      path: '/icons/github.svg',
      text: 'GitHub profile',
      isOpenNewIcon: true,
      action: () => openInNewTab(GITHUB_PROFILE_URL),
    },
    {
      path: '/icons/rootme.svg',
      text: 'RootMe profile',
      isOpenNewIcon: true,
      action: () => openInNewTab(ROOT_ME_PROFILE_URL),
    },
  ],
  [
    {
      path: '/icons/linkedin.png',
      text: 'LinkedIn profile',
      isOpenNewIcon: true,
      action: () => openInNewTab(LINKED_IN_PROFILE_URL),
    },
  ],
]

const getDesktopIconKey = (desktopIcon: DesktopIconType) => desktopIcon.text.toLocaleLowerCase().replace(' ', '-')

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
</script>

<template>
  <div class="row inline q-p">
    <div v-for="(desktopIconsColumn, index) in desktopIcons" :key="`icons-column-${index}`" class="col">
      <desktop-icon
        v-for="desktopIcon in desktopIconsColumn"
        :key="getDesktopIconKey(desktopIcon)"
        class="row"
        :icon-path="desktopIcon.path"
        :icon-text="desktopIcon.text"
        :is-open-new-icon="desktopIcon.isOpenNewIcon"
        :action="desktopIcon.action"
      />
    </div>
  </div>
  <app-window
    v-for="app in openedApps"
    :key="app.name"
    :name="app.name"
    :close-app="closeApp"
    :focus-app="focusApp"
    :is-app-focused="isAppFocused"
  />
</template>
