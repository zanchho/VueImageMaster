<template>
  <div class="login-container">
    <label for="username">Username:</label>
    <input
      id="username"
      v-model="username"
      type="text"
      placeholder="Enter your username"
      required
    />

    <label for="password">Password:</label>
    <input
      id="password"
      v-model="password"
      type="password"
      placeholder="Enter your password"
      required
    />

    <button @click="handleLogin">Login</button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import CryptoJS from "crypto-js"
import vuexStore from "@/store/vuexStore"
const username = ref("")
const password = ref("")
const emits = defineEmits(["loginSuccess", "loginFailed"])

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
    .then(emits("loginSuccess"))
    .catch(err => {
      //TODO actually error Handling with Message
      emits("loginFailed")
      console.error(err)
    })
}
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
}
</style>
