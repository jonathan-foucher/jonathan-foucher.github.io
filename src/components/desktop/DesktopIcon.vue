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
  isOpenNewIcon: {
    type: Boolean,
    default: false,
  },
})

const onDoubleClick = async (event: MouseEvent) => {
  if (event.detail === 2) {
    action()
  }
}
</script>

<template>
  <div class="col desktop-icon" @click="onDoubleClick">
    <div class="row q-pt-sm">
      <q-img :src="iconPath" width="60px" height="60px" />
    </div>
    <div class="row icon-text">
      <span>
        {{ iconText }}
        <q-icon v-if="isOpenNewIcon" name="open_in_new" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.desktop-icon {
  font-family: 'DejaVuSansMono', monospace;
  width: 100px;
  height: 100px;
  justify-content: center;
  text-align: center;
}

.desktop-icon:hover {
  background: rgba(0, 100, 255, 0.15);
}

.icon-text {
  font-size: small;
}
</style>
