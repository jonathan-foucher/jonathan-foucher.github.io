<script setup lang="ts">
const { iconText, iconPath, action } = defineProps({
  iconPath: {
    type: String,
    required: true,
  },
  iconText: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
})

const onDoubleClick = async (event: MouseEvent) => {
  if (event.detail === 2) {
    action()
  }
}
</script>

<template>
  <div class="col q-pa-md desktop-icon cursor-pointer" @click="onDoubleClick">
    <div class="row justify-center text-center">
      <q-img :src="iconPath" width="60px" height="60px" />
    </div>
    <div class="row icon-text">
      {{ iconText }}
    </div>
  </div>
</template>

<style scoped>
.desktop-icon {
  width: 100px;
  justify-content: center;
  text-align: center;
}

.icon-text {
  font-size: small;
}
</style>
