<template>
  <form :class="updateClasses" @submit.prevent="handleLogin">
    <div class="form-group">
      <label for="username">Username:</label>
      <Input
        id="username"
        v-model="username"
        inputType="text"
        placeholder="Enter your username"
        required
        inputClass="form-control"
        autocomplete="username"
      />
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <Input
        id="password"
        v-model="password"
        inputType="password"
        placeholder="Enter your password"
        required
        inputClass="form-control"
        autocomplete="current-password"
      />
    </div>

    <div class="form-group buttons">
      <button
        type="button"
        class="btn btn-primary cancel"
        @click="loginCanceled"
      >
        Cancel
      </button>
      <button type="submit" class="btn btn-primary" @click="handleLogin">
        Login
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits, computed } from "vue"
import CryptoJS from "crypto-js"

import Input from "@/components/InputField.vue"
import vuexStore from "@/store/vuexStore"
const props = defineProps({
  classes: { type: String, default: "" },
})

const defaultFormClass = "login-container"

const username = ref("")
const password = ref("")
const emits = defineEmits(["loginSuccess", "loginFailed", "loginCanceled"])

const updateClasses = computed(() => {
  console.log("computed:", defaultFormClass + " " + props.classes)
  return defaultFormClass + " " + props.classes
})
function resetValues() {
  username.value = ""
  password.value = ""
}
function loginCanceled() {
  resetValues()
  emits("loginCanceled")
}
function loginSuccess() {
  resetValues()
  emits("loginSuccess")
}
function handleLogin() {
  const credentialsJson = JSON.stringify({
    username: username.value,
    password: password.value,
  })

  // Encrypt credentials
  const secretKey = import.meta.env.VITE_CREDENTIAL_SECRET_KEY // use secretKey (openssl rand -hex 32)

  const encryptedCredentials = CryptoJS.AES.encrypt(
    credentialsJson,
    secretKey
  ).toString()

  vuexStore
    .dispatch("login", encryptedCredentials)
    .then(() => loginSuccess())
    .catch(err => {
      //TODO actually error Handling with Message
      emits("loginFailed")
      console.error(err)
    })
}
function handleSubmit() {
  // Handle form submission logic here
}
</script>

<style scoped>
label {
  margin-left: 0.5em;
  user-select: none;
}
.login-container {
  --login-padding-tb: 20px;
  --login-padding-rl: 0;
  margin: 0;
  width: calc(100% - var(--login-padding-rl));
  height: calc(100% - var(--login-padding-tb));

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--login-padding-tb) var(--login-padding-rl);
}

.form-group {
  width: 95%;
  margin-bottom: 15px;
}

.form-group.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-primary {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
.btn-primary.cancel {
  background-color: #b30000bd;
}

.form-control {
  width: 100%;
}

.btn-primary:hover {
  background-color: #007bff;
}
.btn-primary.cancel:hover {
  background-color: #b30000;
}
</style>
