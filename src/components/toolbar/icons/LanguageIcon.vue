<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/stores/locale.ts'

const localeStore = useLocaleStore()
const { selectedLocale } = storeToRefs(localeStore)
const { LOCALES, updateSelectedLocale, getFlagClassFromLocale } = localeStore
</script>

<template>
  <q-btn dense flat class="q-icon">
    <span class="flag" :class="getFlagClassFromLocale(selectedLocale)" />
    <q-menu class="disable-select bg-grey-2" anchor="bottom middle" self="top middle">
      <q-list>
        <q-item
          v-for="locale in LOCALES"
          :key="locale"
          class="q-px-sm"
          dense
          clickable
          v-close-popup
          @click="updateSelectedLocale(locale)"
        >
          <span class="flag" :class="getFlagClassFromLocale(locale)" />
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style scoped>
.flag {
  font-size: 14px;
}
</style>
