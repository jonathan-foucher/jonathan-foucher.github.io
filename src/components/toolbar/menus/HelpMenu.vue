<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useApplicationStore } from '@/stores/application.ts'
import { ApplicationList } from '@/types/ApplicationList.ts'

const { t } = useI18n()

const applicationStore = useApplicationStore()
const { openApp } = applicationStore
</script>

<template>
  <div class="cursor-pointer gt-md">
    {{ t('global.help') }}
    <q-menu>
      <div @click="openApp(ApplicationList.ABOUT_PROJECT)">{{ t('about-project.app-title') }}</div>
    </q-menu>
  </div>
</template>
