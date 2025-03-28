<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type BootUpStep from '@/types/BootUpStep.ts'
import { BOOT_UP_STEPS } from '@/types/BootUpStep.ts'
import { usePowerStore } from '@/stores/power.ts'

const terminalStr: Array<BootUpStep> = reactive([])

const powerStore = usePowerStore()
const { endBooting } = powerStore

const writeNextSteps = (nextSteps: BootUpStep[]) => {
  const step = nextSteps.shift()
  if (step) {
    setTimeout(() => {
      terminalStr.push(step)
      writeNextSteps(nextSteps)
    }, step.timeMs)
  } else {
    setTimeout(() => endBooting(), 2000)
  }
}

onMounted(() => writeNextSteps([...BOOT_UP_STEPS]))
</script>

<template>
  <div class="terminal-text q-pl-lg q-pt-lg">
    <span
      v-for="(bootUpStep, index) in terminalStr"
      :key="`step-${index}`"
      class="text-weight-medium"
      :style="`color: ${bootUpStep.color ?? 'white'}`"
    >
      {{ bootUpStep.text }}
      <br v-if="bootUpStep.isEndOfLine" />
    </span>
  </div>
</template>

<style scoped>
.terminal-text {
  color: white;
  font-family: 'DejaVuSansMono', monospace;
  white-space: pre-wrap;
}
</style>
