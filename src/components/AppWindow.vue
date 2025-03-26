<script setup lang="ts">
import { ref } from 'vue'
import { QPageContainer, type TouchPanValue } from 'quasar'

const APP_TOOLBAR_SIZE_PX = 40
const windowPosition = ref([10, APP_TOOLBAR_SIZE_PX + 10])
const draggingWindow = ref(false)
const windowRef = ref<InstanceType<typeof QPageContainer>>()

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
</script>

<template>
  <q-layout class="disable-select cursor-default">
    <q-page-container>
      <q-slide-transition appear :duration="300">
        <q-page-sticky ref="windowRef" position="top-left" :offset="windowPosition">
          <q-bar dark class="bg-primary text-white" v-touch-pan.prevent.mouse="moveWindow">
            <q-btn dense flat round icon="lens" size="8.5px" color="red" />
            <q-btn dense flat round icon="lens" size="8.5px" color="yellow" />
            <q-btn dense flat round icon="lens" size="8.5px" color="green" />
            <div class="app-title col text-center text-weight-bold">My-App</div>
          </q-bar>
          <q-btn unelevated color="red" icon="add" />
        </q-page-sticky>
      </q-slide-transition>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.app-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
