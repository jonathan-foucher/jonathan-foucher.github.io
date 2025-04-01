<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePowerStore } from '@/stores/power.ts'
import LanguageIcon from '@/components/toolbar/icons/LanguageIcon.vue'

const DISCLAIMER_VALIDATED_LOCAL_STORAGE_KEY = 'disclaimer-validated'

const { t } = useI18n()

const powerStore = usePowerStore()
const { turnOn } = powerStore

const isTurningOn = ref<boolean>(false)
const disclaimerDialog = ref(!localStorage.getItem(DISCLAIMER_VALIDATED_LOCAL_STORAGE_KEY))

const validateDisclaimer = () => localStorage.setItem(DISCLAIMER_VALIDATED_LOCAL_STORAGE_KEY, String(true))

const startBootingUp = () => {
  isTurningOn.value = true
  setTimeout(() => turnOn(), 800)
}
</script>

<template>
  <div v-if="!disclaimerDialog" class="vertical-center">
    <q-btn
      flat
      stack
      outline
      no-caps
      rounded
      size="2.5em"
      :color="isTurningOn ? 'positive' : 'white'"
      @click="startBootingUp"
    >
      <q-icon name="power_settings_new" size="3em" :class="isTurningOn ? 'glowing-positive' : 'glowing-white'" />
      <span class="text-white glowing-white">Turn ON</span>
    </q-btn>
  </div>

  <q-dialog
    v-model="disclaimerDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
    class="disable-select cursor-default"
  >
    <q-card class="disclaimer q-pa-sm bg-grey-3">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col text-h6">Disclaimer</div>

          <div class="col-auto">
            <language-icon />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none disclaimer-content">
        {{ t('global.disclaimer') }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="primary" v-close-popup @click="validateDisclaimer" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
@import '@/quasar-variables.sass';

.vertical-center {
  position: absolute;
  top: 45%;
  left: 50%;
  -ms-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
}

.glowing-white {
  --glowing-color: white;
  animation: glow 1200ms ease-in-out infinite alternate;
}

.glowing-positive {
  --glowing-color: #{$positive};
  animation: glow 1200ms ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 4px var(--glowing-color);
  }
  to {
    text-shadow: 0 0 14px var(--glowing-color);
  }
}

.disclaimer {
  min-width: 30%;
}

.disclaimer-content {
  white-space: pre-wrap;
}
</style>
