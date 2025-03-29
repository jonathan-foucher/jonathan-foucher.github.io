<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { PropType } from 'vue'
import type DesktopIcon from '@/types/DesktopIcon.ts'

const { t } = useI18n()

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
      <q-icon v-if="desktopIcon.isSourceIcon" :name="desktopIcon.source" size="60px" class="icon-color" />
      <q-img v-else :src="desktopIcon.source" width="60px" height="60px" />
    </div>

    <div class="open-new-icon">
      <q-icon v-if="desktopIcon.isOpenNewIcon" name="open_in_new" />
    </div>

    <span class="row icon-text">
      {{ t(desktopIcon.text) }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/quasar-variables.sass';

.desktop-icon {
  font-family: 'DejaVuSansMono', monospace;
  width: 100px;
  height: 110px;
  justify-content: center;
  text-align: center;
}

.desktop-icon:hover {
  background: rgba(0, 45, 251, 0.2);
}

.icon-color {
  color: $light-black;
}

.icon-text {
  font-size: small;
  justify-content: center;
  white-space: normal;
  overflow-wrap: anywhere;
  width: 100px;
}

.open-new-icon {
  position: relative;
  width: 0;
  height: 0;
}
</style>
