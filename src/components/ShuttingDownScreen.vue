<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePowerStore } from '@/stores/power.ts'
import { useWifiStore } from '@/stores/wifi.ts'

const { t } = useI18n()

const powerStore = usePowerStore()
const { endShutdown } = powerStore

const wifiStore = useWifiStore()
const { wifiEnabled } = storeToRefs(wifiStore)

const shutdown = () => {
  setTimeout(() => {
    wifiEnabled.value = false
    endShutdown()
  }, 4000)
}

onMounted(() => shutdown())
</script>

<template>
  <q-inner-loading
    showing
    :transition-duration="0"
    class="bg-primary"
    size="100px"
    color="black"
    :label="t('shutdown.please-wait')"
  />
</template>
