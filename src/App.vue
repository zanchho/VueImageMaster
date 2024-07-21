<template>
  <div>
    <h1>TEST</h1>
    <button @click="openLogin">GO TO LOGIN</button>
    <Modal v-model:model-value="isModalOpen">
      <Login @loginSuccess="closeLogin"></Login>
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
