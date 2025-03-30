<script setup lang="ts">
import { onMounted, type PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useApplicationStore } from '@/stores/application.ts'
import { QPageContainer, type TouchPanValue } from 'quasar'
import type Application from '@/types/Application.ts'

const { t } = useI18n()

const { application } = defineProps({
  application: {
    type: Object as PropType<Application>,
    required: true,
  },
})

const applicationStore = useApplicationStore()
const { closeApp, focusApp, isAppFocused } = applicationStore

const APP_TOOLBAR_SIZE_PX = 40
const TRANSITION_TIME_MS = 400
const windowPosition = ref([10, APP_TOOLBAR_SIZE_PX + 10])
const draggingWindow = ref(false)
const windowRef = ref<InstanceType<typeof QPageContainer>>()
const isFullSize = ref<boolean>(false)
const showApp = ref<boolean>(true)

const getInitialPosition = (size: number, appSize: number, minPosition: number): number => {
  const percentShift = 5
  const random = Math.random() * (2 * percentShift + 1) - percentShift
  const centerPosition = (size - appSize) / 2
  const newPosition = centerPosition + Math.floor(random * (size / 100))
  return Math.max(newPosition, minPosition)
}
onMounted(async () => {
  windowPosition.value = [
    getInitialPosition(document.body.offsetWidth, application.width, 0),
    getInitialPosition(document.body.offsetHeight, application.height, APP_TOOLBAR_SIZE_PX),
  ]
})

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
  focusApp(application.name)

  if (!isFullSize.value) {
    draggingWindow.value = !event.isFirst && !event.isFinal

    windowPosition.value = [
      getNewPositionValue(
        windowPosition.value[0],
        event.delta?.x ?? 0,
        0,
        document.body.offsetWidth - application.width
      ),
      getNewPositionValue(
        windowPosition.value[1],
        event.delta?.y ?? 0,
        APP_TOOLBAR_SIZE_PX,
        document.body.offsetHeight - application.height
      ),
    ]
  }
}

const hideAndCloseApp = () => {
  showApp.value = false
  setTimeout(() => closeApp(application.name), TRANSITION_TIME_MS)
}
</script>

<template>
  <q-slide-transition appear :duration="TRANSITION_TIME_MS">
    <q-page-sticky
      v-show="showApp"
      ref="windowRef"
      position="top-left"
      :offset="isFullSize ? [0, APP_TOOLBAR_SIZE_PX] : windowPosition"
      @click="focusApp(application.name)"
    >
      <q-card
        class="q-pa-none bg-grey-2 vertical-stretch"
        :class="isFullSize ? 'window-width window-height' : ''"
        :style="isFullSize ? '' : `width: ${application.width}px; height: ${application.height}px`"
      >
        <q-bar
          dark
          :class="isAppFocused(application.name) ? 'bg-primary' : 'bg-grey-5'"
          class="text-white"
          v-touch-pan.prevent.mouse="isFullSize ? undefined : moveWindow"
        >
          <q-btn dense flat round icon="lens" size="8.5px" color="red" @click="hideAndCloseApp" />
          <q-icon name="lens" size="14.5px" color="grey" />
          <q-btn dense flat round icon="lens" size="8.5px" color="green" @click="isFullSize = !isFullSize" />

          <div class="app-title col text-center text-weight-bold">{{ t(application.name) }}</div>
        </q-bar>
        <component :is="application.component" />
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

.vertical-stretch {
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;
}
</style>
