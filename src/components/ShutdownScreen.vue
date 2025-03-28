<script setup lang="ts">
import { ref } from 'vue'
import { usePowerStore } from '@/stores/power.ts'

const powerStore = usePowerStore()
const { turnOn } = powerStore

const isTurningOn = ref<boolean>(false)

const startBootingUp = () => {
  isTurningOn.value = true
  setTimeout(() => turnOn(), 800)
}
</script>

<template>
  <div class="vertical-center">
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
</template>

<style scoped lang="scss">
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
</style>
