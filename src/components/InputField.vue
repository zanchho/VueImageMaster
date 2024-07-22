<template>
  <div class="custom-input">
    <input
      :type="inputType"
      v-model="value"
      :placeholder="placeholder"
      :class="{ 'is-password': inputType === 'password' }"
      :required="required"
      :autocomplete="autocomplete"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  inputType: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: "off",
  },
})

const value = ref("")
</script>

<style scoped>
.custom-input {
  width: 100%;
}
.custom-input input {
  --custom-input-border: 2px;
  --custom-input-padding: 10px;
  --custom-input-width: calc(100% - var(--custom-input-border) * 4);
  width: var(--custom-input-width);
  padding: var(--custom-input-padding);
  margin: 0 calc(var(--custom-input-border) * 2);
  border: var(--custom-input-border) solid #ccc;
  border-radius: var(--custom-input-padding);
  box-sizing: border-box;
}

.custom-input input:focus {
  outline: none;
  border: var(--custom-input-border) solid #007bff;
}

.is-password input {
  /* TODO  */
}
</style>
