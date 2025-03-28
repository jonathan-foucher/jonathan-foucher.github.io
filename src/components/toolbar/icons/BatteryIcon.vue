<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <q-btn dense flat icon="battery_charging_full" color="positive">
    <q-menu class="disable-select cursor-default">
      <q-card class="q-pa-sm">
        <q-item dense class="text-blue text-weight-bold">
          {{ t('battery-icon.battery') }}
        </q-item>
        <q-separator />
        <q-item dense class="q-py-sm">
          <div>
            {{ t('battery-icon.fully-charged') }}
            <q-icon name="bolt" />
          </div>
        </q-item>
        <q-item dense>
          <div>
            {{ t('battery-icon.plugged-in') }}
            <q-icon name="electrical_services" />
          </div>
        </q-item>
      </q-card>
    </q-menu>
  </q-btn>
</template>
