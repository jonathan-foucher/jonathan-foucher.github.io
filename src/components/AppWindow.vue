<script setup lang="ts">
import { ref } from 'vue'
import { QPageContainer, type TouchPanValue } from 'quasar'

const { name, closeApp, focusApp, isAppFocused } = defineProps({
  name: {
    type: String,
    required: true,
  },
  closeApp: {
    type: Function,
    required: true,
  },
  focusApp: {
    type: Function,
    required: true,
  },
  isAppFocused: {
    type: Function,
    required: true,
  },
})

const APP_TOOLBAR_SIZE_PX = 40
const windowPosition = ref([10, APP_TOOLBAR_SIZE_PX + 10])
const draggingWindow = ref(false)
const windowRef = ref<InstanceType<typeof QPageContainer>>()
const isFullSize = ref(false)

const getNewPositionValue = (currentValue: number, delta: number, min: number, max: number) => {
  const newValue = currentValue + delta
  if (newValue < min) {
    return min
  }
  if (newValue > max) {
    return max
  }
  return newValue
}

const moveWindow: TouchPanValue = (event) => {
  focusApp(name)

  if (!isFullSize.value) {
    draggingWindow.value = !event.isFirst && !event.isFinal

    windowPosition.value = [
      getNewPositionValue(
        windowPosition.value[0],
        event.delta?.x ?? 0,
        0,
        document.body.offsetWidth - windowRef.value?.$el?.clientWidth
      ),
      getNewPositionValue(
        windowPosition.value[1],
        event.delta?.y ?? 0,
        APP_TOOLBAR_SIZE_PX,
        document.body.offsetHeight - windowRef.value?.$el?.clientHeight
      ),
    ]
  }
}
</script>

<template>
  <q-slide-transition appear :duration="300">
    <q-page-sticky
      ref="windowRef"
      position="top-left"
      :offset="isFullSize ? [0, APP_TOOLBAR_SIZE_PX] : windowPosition"
      @click="focusApp(name)"
    >
      <q-card class="q-pa-none bg-grey-2" :class="isFullSize ? 'window-width window-height' : ''">
        <q-bar
          dark
          :class="isAppFocused(name) ? 'bg-primary' : 'bg-grey-5'"
          class="text-white"
          v-touch-pan.prevent.mouse="isFullSize ? undefined : moveWindow"
        >
          <q-btn dense flat round icon="lens" size="8.5px" color="red" @click="closeApp(name)" />
          <q-icon name="lens" size="14.5px" color="grey" />
          <q-btn dense flat round icon="lens" size="8.5px" color="green" @click="isFullSize = !isFullSize" />

          <div class="app-title col text-center text-weight-bold">{{ name }}</div>
        </q-bar>
        <slot />
      </q-card>
    </q-page-sticky>
  </q-slide-transition>
</template>

<style scoped>
.app-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
