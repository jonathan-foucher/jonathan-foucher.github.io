<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useApplicationStore } from '@/stores/application.ts'
import { ApplicationList } from '@/types/ApplicationList.ts'

const { t } = useI18n()

const applicationStore = useApplicationStore()
const { openApp } = applicationStore
</script>

<template>
  <q-btn no-caps flat class="q-px-xs">
    <div class="help-text">
      {{ t('global.help') }}
    </div>
    <q-menu auto-close>
      <q-card class="q-pa-none">
        <q-item dense class="q-py-sm" clickable @click="openApp(ApplicationList.ABOUT_PROJECT)">
          {{ t('about-project.app-title') }}
        </q-item>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<style scoped>
.help-text {
  font-size: medium;
}
</style>
