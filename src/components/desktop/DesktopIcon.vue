<script setup lang="ts">
import type { PropType } from 'vue'
import type DesktopIcon from '@/types/DesktopIcon.ts'

const { desktopIcon } = defineProps({
  desktopIcon: {
    type: Object as PropType<DesktopIcon>,
    required: true,
  },
})

const onDoubleClick = async (event: MouseEvent) => {
  if (event.detail === 2) {
    desktopIcon.action()
  }
}
</script>

<template>
  <div class="col desktop-icon" @click="onDoubleClick">
    <div class="row q-pt-sm">
      <q-icon v-if="desktopIcon.isSourceIcon" :src="desktopIcon.source" width="60px" height="60px" />
      <q-img v-else :src="desktopIcon.source" width="60px" height="60px" />
    </div>

    <div class="open-new-icon">
      <q-icon v-if="desktopIcon.isOpenNewIcon" name="open_in_new" />
    </div>

    <span class="row icon-text">
      {{ desktopIcon.text }}
    </span>
  </div>
</template>

<style scoped>
.desktop-icon {
  font-family: 'DejaVuSansMono', monospace;
  width: 100px;
  height: 100px;
  justify-content: center;
  text-align: center;
}

.desktop-icon:hover {
  background: rgba(0, 100, 255, 0.15);
}

.icon-text {
  font-size: small;
}

.open-new-icon {
  position: relative;
  width: 0;
  height: 0;
}
</style>
