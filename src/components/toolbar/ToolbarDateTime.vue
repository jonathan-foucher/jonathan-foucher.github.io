<script setup lang="ts">
import { useDateTime } from '@/composables/datatime.ts'

const { formattedDateTime } = useDateTime()
</script>

<template>
  <div class="date-time cursor-default">| {{ formattedDateTime }}</div>
</template>

<style scoped>
.date-time {
  font-family: 'Menlo', monospace;
  font-size: small !important;
}
</style>
