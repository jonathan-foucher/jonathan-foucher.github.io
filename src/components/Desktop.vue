<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDateTime } from '@/composables/datatime.ts'
import { useLocaleStore } from '@/stores/locale.ts'

const { formattedDateTime } = useDateTime()

const localeStore = useLocaleStore()
const { selectedLocale } = storeToRefs(localeStore)
const { LOCALES, updateSelectedLocale, getFlagClassFromLocale } = localeStore
</script>

<template>
  <q-bar class="bg-black text-white">
    <q-btn dense flat icon="list" />
    <div class="cursor-pointer gt-md">Help</div>
    <q-space />

    <q-btn dense flat icon="wifi" />
    <q-btn dense flat icon="battery_charging_full" />
    <q-btn dense flat class="q-icon">
      <span :class="getFlagClassFromLocale(selectedLocale)" />

      <q-menu fit class="bg-grey-4">
        <q-list>
          <q-item
            dense
            class="q-pa-xs"
            v-for="locale in LOCALES"
            clickable
            v-close-popup
            @click="updateSelectedLocale(locale)"
          >
            <span :class="getFlagClassFromLocale(locale)" />
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn dense flat icon="volume_up" />
    <div class="date-time">| {{ formattedDateTime }}</div>
  </q-bar>
</template>

<style scoped>
.date-time {
  font-family: 'Menlo', monospace;
  cursor: default;
  font-size: small !important;
}
</style>
