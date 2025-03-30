<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePowerStore } from '@/stores/power.ts'
import { QPageContainer } from 'quasar'
import DesktopScreen from '@/components/DesktopScreen.vue'
import DesktopToolbar from '@/components/DesktopToolbar.vue'
import ShutdownScreen from '@/components/ShutdownScreen.vue'
import BootingUpScreen from '@/components/BootingUpScreen.vue'
import LoggingInScreen from '@/components/LoggingInScreen.vue'
import ShuttingDownScreen from '@/components/ShuttingDownScreen.vue'

const powerStore = usePowerStore()
const { isTurnedOn, isLoggedIn, isBootingUp, isShuttingDown } = storeToRefs(powerStore)
</script>

<template>
  <q-layout class="disable-select cursor-default">
    <q-page-container>
      <q-page v-if="isBootingUp" class="booting-up-background window-size">
        <booting-up-screen />
      </q-page>

      <q-page v-else-if="isShuttingDown" class="bg-primary window-size">
        <shutting-down-screen />
      </q-page>

      <q-page v-else-if="isTurnedOn && !isLoggedIn" class="bg-primary window-size">
        <logging-in-screen />
      </q-page>

      <q-page v-else-if="isTurnedOn" class="window-size vertical-stretch">
        <desktop-toolbar />
        <desktop-screen />
      </q-page>

      <q-page v-else class="bg-black window-size">
        <shutdown-screen />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
@font-face {
  font-family: 'DejaVuSansMono';
  src:
    local('DejaVuSansMono'),
    url(@/assets/fonts/DejaVuSansMono.ttf) format('truetype');
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

.disable-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>

<style lang="scss" scoped>
@import '@/quasar-variables.sass';

.booting-up-background {
  background-color: $light-black;
}

.vertical-stretch {
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;
}

.window-size {
  height: 100vh;
  width: 100vw;
}
</style>
