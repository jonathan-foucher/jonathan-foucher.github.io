<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useVolumeStore } from '@/stores/volume.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const volumeStore = useVolumeStore()
const { disabledAudio, selectedVolume, volumeIcon } = storeToRefs(volumeStore)
const { updateSelectedVolume, toggleDisabledAudio } = volumeStore

const sliderValue = ref<number>(selectedVolume.value)
</script>

<template>
  <q-btn
    dense
    flat
    :icon="volumeIcon"
    :color="disabledAudio ? 'grey' : 'primary'"
  >
    <q-menu fit class="disable-select cursor-default">
      <q-card class="volume-card q-px-sm q-pb-md bg-grey-2">
        <q-item-label header class="text-black text-weight-bold">
          {{ t('global.volume') }}
        </q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-btn
              dense
              flat
              :icon="volumeIcon"
              :color="disabledAudio ? 'grey' : 'primary'"
              @click="toggleDisabledAudio"
            />
          </q-item-section>
          <q-item-section>
            <q-slider
              v-model="sliderValue"
              :min="0.0"
              :max="1.0"
              :step="0.01"
              @update:modelValue="updateSelectedVolume(sliderValue)"
            />
          </q-item-section>
        </q-item>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<style scoped>
.volume-card {
  width: 300px;
}
</style>
