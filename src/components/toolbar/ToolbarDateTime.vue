<script setup lang="ts">
import { useDateTime } from '@/composables/datatime.ts'

const { formattedDateTime } = useDateTime()
</script>

<template>
  <div class="date-time">| {{ formattedDateTime }}</div>
</template>

<style scoped>
.date-time {
  font-family: 'Menlo', monospace;
  cursor: default;
  font-size: small !important;
}
</style>
