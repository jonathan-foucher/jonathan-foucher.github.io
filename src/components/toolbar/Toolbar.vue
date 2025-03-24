<script setup lang="ts">
import BatteryIcon from '@/components/toolbar/icons/BatteryIcon.vue'
import HelpMenu from '@/components/toolbar/menus/HelpMenu.vue'
import LanguageIcon from '@/components/toolbar/icons/LanguageIcon.vue'
import ListMenu from '@/components/toolbar/menus/ListMenu.vue'
import ToolbarDateTime from '@/components/toolbar/ToolbarDateTime.vue'
import VolumeIcon from '@/components/toolbar/icons/VolumeIcon.vue'
import WifiIcon from '@/components/toolbar/icons/WifiIcon.vue'
</script>

<template>
  <q-bar class="bg-black text-white">
    <list-menu />
    <help-menu />
    <q-space />

    <wifi-icon />
    <battery-icon />
    <language-icon />
    <volume-icon />
    <toolbar-date-time />
  </q-bar>
</template>
