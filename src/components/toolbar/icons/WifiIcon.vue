<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useWifiStore } from '@/stores/wifi.ts'
import { storeToRefs } from 'pinia'

const ROUTER_NAME = 'jf‑rtr‑x01'
const { t } = useI18n()

const wifiStore = useWifiStore()
const { wifiEnabled, wifiLoading } = storeToRefs(wifiStore)
</script>

<template>
  <q-btn dense flat>
    <q-spinner-radio v-if="wifiLoading" color="warning" size="0.8em" />
    <q-icon v-else :name="wifiEnabled ? 'wifi' : 'wifi_off'" />
    <q-menu fit class="disable-select cursor-default">
      <q-card class="wifi-card q-pa-sm bg-grey-2">
        <q-item dense class="text-blue text-weight-bold">
          {{ t('wifi-icon.wifi-network') }}
        </q-item>
        <q-separator />
        <q-item dense class="q-py-sm">
          <q-item-section avatar>
            <q-toggle v-model="wifiEnabled" dense color="positive" />
          </q-item-section>
          {{ t('wifi-icon.enable-wifi', { router_name: ROUTER_NAME }) }}
        </q-item>
        <q-separator />
        <q-item dense class="q-pt-sm">
          <q-item-section avatar>
            <q-icon dense :name="wifiEnabled ? 'router' : 'wifi_off'" :color="wifiEnabled ? 'black' : 'negative'" />
          </q-item-section>
          <i18n-t
            v-if="wifiEnabled"
            :keypath="wifiLoading ? 'wifi-icon.connecting-to-router' : 'wifi-icon.connected-to-router'"
            tag="span"
          >
            <template v-slot:router_name>
              <span :class="wifiLoading ? 'router-name-connecting' : 'router-name-connected'">
                {{ ROUTER_NAME }}
              </span>
            </template>
          </i18n-t>
          <span v-else class="justify-center align-center text-center">{{ t('wifi-icon.wifi-off') }}</span>
        </q-item>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<style scoped lang="scss">
@import '@/quasar-variables.sass';

.router-name-connecting {
  color: $warning;
  font-weight: bold;
}

.router-name-connected {
  color: $positive;
  font-weight: bold;
}

.wifi-card {
  width: 350px;
}
</style>
