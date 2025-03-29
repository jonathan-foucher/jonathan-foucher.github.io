<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useApplicationStore } from '@/stores/application.ts'
import AppWindow from '@/components/desktop/apps/AppWindow.vue'
import { useRedirection } from '@/composables/redirection.ts'
import DesktopIcon from '@/components/desktop/DesktopIcon.vue'
import type DesktopIconType from '@/types/DesktopIcon.ts'

const applicationStore = useApplicationStore()
const { openedApps } = storeToRefs(applicationStore)

const { GITHUB_PROFILE_URL, ROOT_ME_PROFILE_URL, LINKED_IN_PROFILE_URL, openInNewTab } = useRedirection()

const desktopIcons: Array<Array<DesktopIconType>> = [
  [
    {
      source: '/icons/github.svg',
      isSourceIcon: false,
      text: 'GitHub',
      isOpenNewIcon: true,
      action: () => openInNewTab(GITHUB_PROFILE_URL),
    },
    {
      source: '/icons/rootme.svg',
      isSourceIcon: false,
      text: 'RootMe',
      isOpenNewIcon: true,
      action: () => openInNewTab(ROOT_ME_PROFILE_URL),
    },
  ],
  [
    {
      source: '/icons/linkedin.png',
      isSourceIcon: false,
      text: 'LinkedIn',
      isOpenNewIcon: true,
      action: () => openInNewTab(LINKED_IN_PROFILE_URL),
    },
  ],
]

const getKeyFromText = (text: string) => text.toLocaleLowerCase().replace(' ', '-')
</script>

<template>
  <div class="row inline q-gutter-sm q-pl-sm">
    <div v-for="(desktopIconsColumn, index) in desktopIcons" :key="`icons-column-${index}`" class="col q-gutter-y-sm">
      <desktop-icon
        v-for="desktopIcon in desktopIconsColumn"
        :key="getKeyFromText(desktopIcon.text)"
        class="row"
        :desktop-icon="desktopIcon"
      />
    </div>
  </div>

  <app-window v-for="app in openedApps" :key="getKeyFromText(app.name)" :application="app" />
</template>
