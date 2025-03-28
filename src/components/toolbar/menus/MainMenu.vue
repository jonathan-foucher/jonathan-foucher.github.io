<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ApplicationList } from '@/types/ApplicationList.ts'
import { useApplicationStore } from '@/stores/application.ts'

const { t } = useI18n()
const { openApp, closeAllApps } = useApplicationStore()
</script>

<template>
  <q-btn dense flat icon="menu" size="medium">
    <q-menu auto-close>
      <q-card class="main-menu q-pa-none">
        <q-item dense class="q-py-sm q-px-none" clickable @click="openApp(ApplicationList.ABOUT_PROJECT)">
          <q-icon class="col-2" name="power_settings_new" color="negative" size="medium" />
          <span class="col-10">
            {{ t('main-menu.shutdown') }}
          </span>
        </q-item>
        <q-separator />
        <q-item dense class="q-py-sm q-px-none" clickable @click="closeAllApps">
          <q-icon class="col-2" name="close" color="negative" size="medium" />
          <span class="col-10">
            {{ t('main-menu.close-all-apps') }}
          </span>
        </q-item>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<style scoped>
.main-menu {
  width: 300px;
}
</style>
