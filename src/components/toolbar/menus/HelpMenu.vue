<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useApplicationStore } from '@/stores/application.ts'
import { useRedirection } from '@/composables/redirection.ts'
import { ApplicationList } from '@/types/ApplicationList.ts'

const { t } = useI18n()

const applicationStore = useApplicationStore()
const { openApp } = applicationStore

const { openInNewTab, getGithubProjectUrl } = useRedirection()
const reportBugUrl = `${getGithubProjectUrl()}/issues`
</script>

<template>
  <q-btn no-caps flat class="q-px-xs">
    <div class="help-text">
      {{ t('global.help') }}
    </div>
    <q-menu auto-close class="disable-select cursor-default">
      <q-card class="q-pa-none">
        <q-item dense class="q-py-sm" clickable @click="openApp(ApplicationList.ABOUT_PROJECT)">
          {{ t('about-project.app-title') }}
        </q-item>
        <q-separator />
        <q-item dense class="q-py-sm" clickable @click="openInNewTab(reportBugUrl)">
          <div>
            {{ t('about-project.report-bug') }}
            <q-icon name="open_in_new" class="q-pl-xs" />
          </div>
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
