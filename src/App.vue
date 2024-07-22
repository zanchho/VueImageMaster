<template>
  <div>
    <h1>TEST</h1>
    <button @click="openLogin">GO TO LOGIN</button>
    <Modal
      :blockUI="true"
      v-model:model-value="isModalOpen"
      :internalClosing="false"
    >
      <Login
        @loginCanceled="closeLogin"
        @loginSuccess="closeLogin"
        classes="login"
      ></Login>
    </Modal>
    <ImageUploader> </ImageUploader>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal.vue"
import Login from "@/components/Login.vue"
import ImageUploader from "@/components/ImageUploader.vue"

import { ref } from "vue"
const isModalOpen = ref(false)
function openLogin() {
  isModalOpen.value = true
}
function closeLogin() {
  isModalOpen.value = false
}
</script>

<style scoped>
.login {
  background-color: #292929;
}
</style>
