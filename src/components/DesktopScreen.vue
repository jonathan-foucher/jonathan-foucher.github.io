<script setup lang="ts">
import { ref } from 'vue'
import AppWindow from '@/components/AppWindow.vue'
import type Application from '@/types/Application.ts'

const openedApps = ref<Array<Application>>([{ name: 'some-app' }, { name: 'some-other-app' }])

const closeApp = (name: string) => {
  openedApps.value = openedApps.value.filter((app) => app.name !== name)
}
</script>

<template>
  <app-window v-for="app in openedApps" :key="app.name" :name="app.name" :close-app="closeApp" />
</template>
