<script setup lang="ts">
import { useDateTime } from '../composables/datatime.ts'

const { formattedDateTime } = useDateTime()
</script>

<template>
  <q-bar class="bg-black text-white">
    <q-btn dense flat icon="list" />
    <div class="cursor-pointer gt-md">Help</div>
    <q-space />
    <q-btn dense flat icon="flag" class="gt-xs" />
    <q-btn dense flat icon="battery_charging_full" />
    <q-btn dense flat icon="wifi" />
    <div class="date-time">| {{ formattedDateTime }}</div>
  </q-bar>
</template>

<style>
.date-time {
  font-family: 'Menlo', monospace;
  cursor: default;
  font-size: smaller !important;
}
</style>
