<template>
  <div class="custom-input">
    <input
      :type="internalInputType"
      v-model="value"
      :placeholder="placeholder"
      :class="
        isPassword(inputType) ? 'input-field  is-password' : 'input-field '
      "
      :required="required"
      :autocomplete="autocomplete"
    />
    <span
      v-if="isPassword(inputType)"
      @click="togglePasswordVisible"
      class="password-vision-icon"
    >
      <div
        :class="
          'icon ' +
          (isPassword(internalInputType) ? 'visible-icon' : 'not-visible-icon')
        "
      ></div>
    </span>
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

const internalInputType = ref(props.inputType)

const value = ref("")

const togglePasswordVisible = () => {
  if (!isPassword(props.inputType)) return
  internalInputType.value = isPassword(internalInputType.value)
    ? "text"
    : "password"
}
function isPassword(value) {
  return value === "password"
}
</script>

<style scoped>
.custom-input {
  display: inline-block;
  width: 100%;
  --custom-input-border: 2px;
  --custom-input-padding: 10px;
  --custom-input-width: calc(100% - var(--custom-input-border) * 4);
  --calced-input-height: calc(1em + var(--custom-input-padding) * 2);
}
.custom-input .input-field {
  width: var(--custom-input-width);
  padding: var(--custom-input-padding);
  margin: 0 calc(var(--custom-input-border) * 2);
  border: var(--custom-input-border) solid #ccc;
  border-radius: var(--custom-input-padding);
  box-sizing: border-box;
}

.custom-input .input-field:focus {
  outline: none;
  border: var(--custom-input-border) solid #007bff;
}

.custom-input .input-field.is-password {
  /* var(--custom-input-border) * 3 because 2borders are aligned on the button and 1 comes from the inputfield itself  */
  width: calc(
    var(--custom-input-width) - var(--calced-input-height) -
      var(--custom-input-border) * 3
  );
  margin-right: 0;
  border-radius: var(--custom-input-padding) 0 0 var(--custom-input-padding);
}
.custom-input .input-field + .password-vision-icon {
  display: inline-flex;
  justify-self: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: var(--calced-input-height);
  width: var(--calced-input-height);

  background-color: inherit;
  border: var(--custom-input-border) solid #ccc;
  border-radius: 0 var(--custom-input-padding) var(--custom-input-padding) 0;
}

.custom-input .password-vision-icon:hover {
  cursor: pointer;
  outline: none;
  border: var(--custom-input-border) solid #007bff;
  background-color: inherit;
}

.visible-icon {
  height: 90%;
  width: 90%;
  /* */
  background: url("@resource/visible-eye-svgrepo-com.svg");
  background-size: cover;
}
.not-visible-icon {
  height: 90%;
  width: 90%;
  background: url("@resource/not-visible-svgrepo-com.svg");
  background-size: cover;
}
.icon {
  height: 90%;
  width: 90%;
  background-size: cover;
  transition: background-image 0.3s ease-in-out;
}
</style>
