<script setup lang="ts">
import { computed, onMounted, type PropType, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useApplicationStore } from '@/stores/application.ts'
import { useSoundSfx } from '@/composables/sound-sfx.ts'
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
const { CLOSING_TRANSITION_TIME_MS, closeApp, focusApp, isAppFocused, acceptClosingRequest } = applicationStore

const { requestsForClosing } = storeToRefs(applicationStore)

const { playMouseClickSfx } = useSoundSfx()

const APP_TOOLBAR_SIZE_PX = 40
const windowPosition = ref([10, APP_TOOLBAR_SIZE_PX + 10])
const draggingWindow = ref(false)
const windowRef = ref<InstanceType<typeof QPageContainer>>()
const isFullSize = ref<boolean>(false)
const showApp = ref<boolean>(true)

const getInitialPosition = (size: number, appSize: number, minPosition: number): number => {
  const percentShift = 5
  if (size <= appSize * ((2 * percentShift + 100) / 100)) {
    return minPosition
  }

  const random = Math.random() * (2 * percentShift + 1) - percentShift
  const centerPosition = (size - appSize) / 2
  const newPosition = centerPosition + Math.floor(random * (size / 100))
  return Math.max(newPosition, minPosition)
}

const windowWidth = computed(() => Math.min(application.width, document.body.offsetWidth))
const windowHeight = computed(() => Math.min(application.height, document.body.offsetHeight))

onMounted(async () => {
  playMouseClickSfx()

  windowPosition.value = [
    getInitialPosition(document.body.offsetWidth, windowWidth.value, 0),
    getInitialPosition(document.body.offsetHeight, windowHeight.value, APP_TOOLBAR_SIZE_PX),
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
        windowPosition.value[0] ?? 0,
        event.delta?.x ?? 0,
        0,
        document.body.offsetWidth - windowWidth.value
      ),
      getNewPositionValue(
        windowPosition.value[1] ?? 0,
        event.delta?.y ?? 0,
        APP_TOOLBAR_SIZE_PX,
        document.body.offsetHeight - windowHeight.value
      ),
    ]
  }
}

const hideAndCloseApp = () => {
  playMouseClickSfx()
  showApp.value = false
  setTimeout(() => closeApp(application.name), CLOSING_TRANSITION_TIME_MS)
}

watch(requestsForClosing, (newValue) => {
  if (newValue.includes(application.name)) {
    acceptClosingRequest(application.name)
    hideAndCloseApp()
  }
})
</script>

<template>
  <q-slide-transition appear :duration="CLOSING_TRANSITION_TIME_MS">
    <q-page-sticky
      v-show="showApp"
      ref="windowRef"
      position="top-left"
      class="z-max"
      :offset="isFullSize ? [0, APP_TOOLBAR_SIZE_PX] : windowPosition"
      @click="focusApp(application.name)"
    >
      <q-card
        class="q-pa-none bg-grey-2 vertical-stretch"
        :class="isFullSize ? 'window-width window-height' : ''"
        :style="isFullSize ? '' : `width: ${windowWidth}px; height: ${windowHeight}px`"
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
        <q-scroll-area class="fit">
          <component :is="application.component" />
        </q-scroll-area>
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
