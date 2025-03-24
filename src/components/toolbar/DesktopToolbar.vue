<script setup lang="ts">
import BatteryIcon from '@/components/toolbar/icons/BatteryIcon.vue'
import HelpMenu from '@/components/toolbar/menus/HelpMenu.vue'
import LanguageIcon from '@/components/toolbar/icons/LanguageIcon.vue'
import MainMenu from '@/components/toolbar/menus/MainMenu.vue'
import ToolbarDateTime from '@/components/toolbar/ToolbarDateTime.vue'
import VolumeIcon from '@/components/toolbar/icons/VolumeIcon.vue'
import WifiIcon from '@/components/toolbar/icons/WifiIcon.vue'
</script>

<template>
  <q-bar class="bg-black text-white disable-select">
    <main-menu />
    <help-menu />
    <q-space />

    <language-icon />
    <wifi-icon />
    <volume-icon />
    <battery-icon />
    <toolbar-date-time />
  </q-bar>
</template>
