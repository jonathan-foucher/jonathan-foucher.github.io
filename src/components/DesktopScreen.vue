<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useApplicationStore } from '@/stores/application.ts'
import { useSoundSfx } from '@/composables/sound-sfx.ts'
import { useRedirection } from '@/composables/redirection.ts'
import AppWindow from '@/components/desktop/apps/AppWindow.vue'
import DesktopIcon from '@/components/desktop/DesktopIcon.vue'
import type DesktopIconType from '@/types/DesktopIcon.ts'
import { ApplicationList } from '@/types/ApplicationList.ts'

const applicationStore = useApplicationStore()
const { openedApps } = storeToRefs(applicationStore)
const { openApp } = applicationStore

const { playLoginSfx } = useSoundSfx()

const { GITHUB_PROFILE_URL, ROOT_ME_PROFILE_URL, LINKED_IN_PROFILE_URL, openInNewTab } = useRedirection()

const desktopIcons: Array<Array<DesktopIconType>> = [
  [
    {
      source: '/icons/linkedin-black.png',
      isSourceIcon: false,
      text: 'redirect.linkedin',
      isOpenNewIcon: true,
      action: () => openInNewTab(LINKED_IN_PROFILE_URL),
    },
    {
      source: '/icons/github.svg',
      isSourceIcon: false,
      text: 'redirect.github',
      isOpenNewIcon: true,
      action: () => openInNewTab(GITHUB_PROFILE_URL),
    },
    {
      source: '/icons/rootme.svg',
      isSourceIcon: false,
      text: 'redirect.rootme',
      isOpenNewIcon: true,
      action: () => openInNewTab(ROOT_ME_PROFILE_URL),
    },
  ],
  [
    {
      source: 'picture_as_pdf',
      isSourceIcon: true,
      text: 'introduction-pdf.file-name',
      isOpenNewIcon: false,
      action: () => openApp(ApplicationList.INTRODUCTION_PDF),
    },
    {
      source: 'picture_as_pdf',
      isSourceIcon: true,
      text: 'resume-pdf.file-name',
      isOpenNewIcon: false,
      action: () => openApp(ApplicationList.RESUME_PDF),
    },
  ],
]

const getKeyFromText = (text: string) => text.toLocaleLowerCase().replace(' ', '-')

onMounted(() => playLoginSfx())
</script>

<template>
  <div class="fit desktop-background">
    <div class="absolute-center background-image">
      <q-img src="@/assets/images/computer-background.gif" />
    </div>
    <div class="row inline q-gutter-md q-pl-sm">
      <div
        v-for="(desktopIconsColumn, index) in desktopIcons"
        :key="`icons-column-${index}`"
        class="desktop-icon col q-gutter-y-xs"
      >
        <desktop-icon
          v-for="desktopIcon in desktopIconsColumn"
          :key="getKeyFromText(desktopIcon.text)"
          class="row"
          :desktop-icon="desktopIcon"
        />
      </div>
    </div>
  </div>

  <app-window v-for="app in openedApps" :key="getKeyFromText(app.name)" :application="app" />
</template>

<style scoped>
.background-image {
  width: 30%;
}

.desktop-background {
  background-image: linear-gradient(25deg, #0c8787, #554298 70%);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.desktop-icon {
  z-index: 1;
}
</style>
