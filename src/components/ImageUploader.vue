<template>
  <div class="image-uploader">
    <button @click="triggerFileSelection">Select File</button>
    <input
      type="file"
      ref="fileInput"
      @change="onFileChange"
      accept="image/*"
    />
    <p v-if="invalidFileType" class="error-message">
      Please select an image file.
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue"
const emits = defineEmits(["update:modelValue"])
const fileInput = ref(null)
function triggerFileSelection() {
  fileInput.value.click() // Programmatically click the hidden file input
}
const fileName = ref("")
const previewImage = ref("")

const invalidFileType = ref(false) // Flag to indicate if the selected file is not an image

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) {
    return
  }

  // Check if the file is allowed
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"]
  const fileExtension = file.name.split(".").pop().toLowerCase()

  if (!allowedExtensions.includes(fileExtension)) {
    invalidFileType.value = true
    return
  }

  // Clear the error message if prev shown
  invalidFileType.value = false
  fileName.value = file.name
  // read the file as data URL
  const reader = new FileReader()
  reader.onload = function (event) {
    previewImage.value = event.target.result
    emits("update:modelValue", event.target.result)
  }
  reader.onerror = err => {
    console.error(err)
  }
  reader.readAsDataURL(file)
}

async function uploadImage() {
  // TODO with express
}
</script>

<style scoped>
.image-uploader input[type="file"] {
  display: none;
}

.image-uploader img {
  max-width: 200px;
  height: auto;
}

.error-message {
  color: red;
}
</style>
