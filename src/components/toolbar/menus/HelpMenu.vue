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
      <q-btn dense flat :label="t('about-project.app-title')" @click="openApp(ApplicationList.ABOUT_PROJECT)" />
    </q-menu>
  </div>
</template>
