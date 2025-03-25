<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDateTime } from '@/composables/datatime.ts'

const { t } = useI18n()
const { timeZone, formattedDateTime, getCurrentTimeZoneOffset } = useDateTime()
</script>

<template>
  <q-separator color="white" />
  <div class="date-time cursor-default">
    {{ formattedDateTime }}
    <q-tooltip class="bg-blue-grey-4" anchor="bottom middle" self="top middle" :delay="200">
      <div class="time-zone-tooltip">
        <q-icon name="info" size="medium" />
        {{ t('toolbar-date-time.timezone-info', { tz_name: timeZone, tz_offset: getCurrentTimeZoneOffset() }) }}
      </div>
    </q-tooltip>
  </div>
</template>

<style scoped>
.date-time {
  font-family: 'Menlo', monospace;
  font-size: small !important;
}

.time-zone-tooltip {
  font-size: small;
  white-space: nowrap;
}
</style>
