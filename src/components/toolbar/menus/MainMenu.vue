<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useApplicationStore } from '@/stores/application.ts'
import { usePowerStore } from '@/stores/power.ts'
import { ApplicationList } from '@/types/ApplicationList.ts'

const { t } = useI18n()
const { closeAllApps } = useApplicationStore()

const powerStore = usePowerStore()
const { startShutdown } = powerStore

const applicationStore = useApplicationStore()
const { openApp } = applicationStore
</script>

<template>
  <q-btn dense flat icon="menu" size="medium">
    <q-menu auto-close class="disable-select cursor-default">
      <q-card bordered class="q-pa-none">
        <q-item dense class="q-pa-sm card-header">
          <div class="col-3 flex items-center q-pl-xs" @click.stop>
            <q-avatar size="md">
              <img src="@/assets/images/my-avatar.png" alt="avatar" />
            </q-avatar>
          </div>
          <div class="col-9 flex items-center" @click.stop>
            <i18n-t keypath="main-menu.connected-as" tag="span">
              <template v-slot:name>
                <br />
                <span>Jonathan Foucher</span>
              </template>
            </i18n-t>
          </div>
        </q-item>

        <q-item dense class="q-pa-sm" clickable @click="startShutdown">
          <q-icon class="col-2" name="power_settings_new" color="negative" size="medium" />
          <span class="col-10 no-wrap q-pr-xl">
            {{ t('main-menu.shutdown') }}
          </span>
        </q-item>
        <q-separator />

        <q-item dense class="q-pa-sm" clickable @click="openApp(ApplicationList.INTRODUCTION_PDF)">
          <q-icon class="col-2" name="picture_as_pdf" color="black" size="medium" />
          <span class="col-10 no-wrap q-pr-xl">
            {{ `${t('introduction-pdf.file-name')}.pdf` }}
          </span>
        </q-item>
        <q-separator />

        <q-item dense class="q-pa-sm" clickable @click="closeAllApps">
          <q-icon class="col-2" name="close" color="negative" size="medium" />
          <span class="col-10 no-wrap q-pr-xl">
            {{ t('main-menu.close-all-apps') }}
          </span>
        </q-item>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<style scoped>
.no-wrap {
  white-space: nowrap;
}

.card-header {
  background-color: royalblue;
  color: white;
  font-weight: bold;
}
</style>
