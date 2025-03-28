<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePowerStore } from '@/stores/power.ts'
import { QPageContainer } from 'quasar'
import DesktopScreen from '@/components/DesktopScreen.vue'
import DesktopToolbar from '@/components/DesktopToolbar.vue'
import ShutdownScreen from '@/components/ShutdownScreen.vue'

const powerStore = usePowerStore()
const { isTurnedOn, isLoggedIn, isBooting, isShuttingDown } = storeToRefs(powerStore)
</script>

<template>
  <q-layout class="disable-select cursor-default">
    <q-page-container>
      <q-page v-if="isBooting"> </q-page>

      <q-page v-else-if="isShuttingDown"> </q-page>

      <q-page v-else-if="isTurnedOn && !isLoggedIn"> </q-page>

      <q-page v-else-if="isTurnedOn" class="fit desktop-background">
        <desktop-toolbar />
        <desktop-screen />
      </q-page>

      <q-page v-else class="bg-black">
        <shutdown-screen />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
@font-face {
  font-family: 'Menlo';
  src:
    local('Menlo'),
    url(@/assets/fonts/Menlo-Regular.ttf) format('truetype');
}

html {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

body {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}

.cursor-default {
  cursor: default;
}

.desktop-background {
  background-image: linear-gradient(35deg, darkslategrey, darkslateblue);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: calc(100vh - 40px);
}

.disable-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
