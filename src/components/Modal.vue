<template>
  <div v-show="modelValue" class="modal">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(["update:modelValue"])

const show = ref(props.modelValue)

watch(
  () => props.modelValue,
  newValue => {
    show.value = newValue
    emit("update:modelValue", newValue)
  }
)
</script>

<style scoped>
.modal {
  position: fixed;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 25px;
}

.modal-content {
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 25px;
}
</style>
