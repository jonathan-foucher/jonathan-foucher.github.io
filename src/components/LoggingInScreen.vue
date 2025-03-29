<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePowerStore } from '@/stores/power.ts'
import { useWifiStore } from '@/stores/wifi.ts'

const password = ref<string>('')
const isValidationLoading = ref<boolean>(false)

const powerStore = usePowerStore()
const { endLoggingIn } = powerStore

const wifiStore = useWifiStore()
const { wifiEnabled } = storeToRefs(wifiStore)

const validatePassword = () => {
  isValidationLoading.value = true

  setTimeout(() => {
    isValidationLoading.value = false
    wifiEnabled.value = true
    endLoggingIn()
  }, 2000)
}

const addNextPasswordChar = (counter: number) => {
  setTimeout(
    () => {
      password.value += ' '

      if (counter > 0) {
        addNextPasswordChar(counter - 1)
      } else {
        validatePassword()
      }
    },
    100 + Math.floor(Math.random() * 101)
  )
}

onMounted(() => {
  setTimeout(() => addNextPasswordChar(12), 1000)
})
</script>

<template>
  <div class="vertical-center">
    <div class="text-center">
      <q-avatar size="200px">
        <img src="@/assets/images/my-avatar.png" alt="avatar" />
      </q-avatar>
    </div>

    <div class="name q-pt-sm q-pb-md">Jonathan Foucher</div>

    <q-input
      v-model="password"
      class="text-center"
      input-class="text-black q-pa-sm"
      rounded
      standout
      autofocus
      color="black"
      bg-color="grey-4"
      type="password"
      :loading="isValidationLoading"
      @keydown.prevent
    >
      <template v-slot:append>
        <q-icon v-if="!isValidationLoading" name="login" color="primary" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<style scoped>
.vertical-center {
  position: absolute;
  top: 45%;
  left: 50%;
  -ms-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
}

.name {
  font-family: 'DejaVuSansMono', monospace;
  font-size: large;
  text-align: center;
}
</style>
