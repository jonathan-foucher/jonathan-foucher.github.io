<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type TechStack from '@/types/TechStack.ts'
import { useRedirection } from '@/composables/redirection.ts'

const { t } = useI18n()
const { openInNewTab, getGithubProjectUrl } = useRedirection()

const techStacks: Array<TechStack> = [
  {
    name: 'Vue.js',
    filePath: '/tech-stack/vue.svg',
  },
  {
    name: 'Vite',
    filePath: '/tech-stack/vite.svg',
  },
  {
    name: 'TypeScript',
    filePath: '/tech-stack/typescript.svg',
  },
  {
    name: 'Quasar',
    filePath: '/tech-stack/quasar.svg',
  },
  {
    name: 'Pinia',
    filePath: '/tech-stack/pinia.png',
  },
  {
    name: 'Yarn',
    filePath: '/tech-stack/yarn.svg',
  },
  {
    name: 'ESLint',
    filePath: '/tech-stack/eslint.svg',
  },
  {
    name: 'Git',
    filePath: '/tech-stack/git.svg',
  },
  {
    name: 'GitHub',
    filePath: '/tech-stack/github.svg',
  },
  {
    name: 'GitHub Actions',
    filePath: '/tech-stack/github-actions.svg',
  },
]
</script>

<template>
  <div class="row q-pa-md">
    {{ t('about-project.summary') }}
  </div>

  <q-separator />
  <div class="row q-pt-md q-px-md">
    <span class="q-pb-md">{{ t('about-project.technical-stack') }} :</span>
  </div>
  <div class="row q-gutter-md q-pb-md q-px-md justify-center">
    <div v-for="techStack in techStacks" :key="techStack.name">
      <q-img :src="techStack.filePath" width="60px" height="60px" />
      <q-tooltip :delay="200">
        {{ techStack.name }}
      </q-tooltip>
    </div>
  </div>

  <q-separator />
  <div class="row justify-center q-pa-md">
    <q-btn
      color="blue"
      :label="t('about-project.open-github')"
      icon-right="open_in_new"
      size="sm"
      @click="openInNewTab(getGithubProjectUrl())"
    />
  </div>
</template>
