<script setup lang="ts">
import { ref } from 'vue'
import { usePowerStore } from '@/stores/power.ts'

const powerStore = usePowerStore()
const { turnOn } = powerStore

const isTurningOn = ref<boolean>(false)

const startBooting = () => {
  isTurningOn.value = true
  setTimeout(() => turnOn(), 800)
}
</script>

<template>
  <div class="vertical-center">
    <q-btn flat stack outline no-caps rounded :color="isTurningOn ? 'positive' : 'white'" @click="startBooting">
      <q-icon name="power_settings_new" size="5em" />
      <span class="text-white">Turn ON</span>
    </q-btn>
  </div>
</template>

<style scoped>
.vertical-center {
  position: absolute;
  top: 45%;
  left: 50%;
  -ms-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
}
</style>
