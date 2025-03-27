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
  <div class="col q-px-md q-py-sm desktop-icon" @click="onDoubleClick">
    <div class="row justify-center text-center cursor-pointer">
      <q-img :src="iconPath" width="60px" height="60px" />
    </div>
    <div class="row icon-text cursor-pointer">
      <span>
        {{ iconText }}
        <q-icon v-if="isOpenNewIcon" name="open_in_new" />
      </span>
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
