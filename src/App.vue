<script setup lang="ts">
import DesktopScreen from '@/components/DesktopScreen.vue'
import DesktopToolbar from '@/components/toolbar/DesktopToolbar.vue'
import { QPageContainer } from 'quasar'
</script>

<template>
  <q-layout class="disable-select cursor-default">
    <q-page-container class="desktop">
      <desktop-toolbar />
      <desktop-screen />
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

.disable-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
