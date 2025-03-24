<script setup lang="ts">
import DesktopScreen from '@/components/DesktopScreen.vue'
</script>

<template>
  <desktop-screen />
</template>

<style>
@font-face {
  font-family: 'Menlo';
  src:
    local('Menlo'),
    url(@/assets/fonts/Menlo-Regular.ttf) format('truetype');
}

html {
  overflow: hidden;
  height: 100%;
}

body {
  height: 100%;
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
