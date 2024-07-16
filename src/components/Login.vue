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

function handleLogin() {
  const credentialsJson = JSON.stringify({
    username: username.value,
    password: password.value,
  })

  // Encrypt credentials
  //TODO regen SecretKey and use env or else
  const secretKey =
    "3a4ea7e8355b5e2c21b61a2bf1d20ff0ac50526ab5be26bc99a027be54d7ba0a" // use secretKey (openssl rand -hex 32)
  const encryptedCredentials = CryptoJS.AES.encrypt(
    credentialsJson,
    secretKey
  ).toString()
  //TODO remove log
  console.log("Encrypted Credentials:", encryptedCredentials)

  vuexStore.dispatch("login", encryptedCredentials)
}
</script>
