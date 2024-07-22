<template>
  <div v-show="modelValue" class="modal modal-size">
    <header class="modal-header">
      <h2 id="modal-title">{{ title }}</h2>
      <button v-if="internalClosing" @click="closeModal" class="modal-close">
        X
      </button>
    </header>

    <main class="modal-content">
      <slot></slot>
    </main>
  </div>
  <div
    v-if="blockUI"
    v-show="modelValue"
    class="UIBLOCKER"
    @click="closeModal"
  ></div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue"

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  blockUI: { type: Boolean, default: true },
  title: { type: String, default: "Hier könnte Ihre Werbung stehen!" },
  shouldCloseOnOutterClick: { type: Boolean, default: true },
  internalClosing: { type: Boolean, default: true },
})

const emit = defineEmits(["update:modelValue"])

const show = ref(props.modelValue)

watch(
  () => props.modelValue,
  newValue => {
    show.value = newValue
  }
)

function closeModal() {
  emit("update:modelValue", false)
}
</script>

<style scoped>
.modal {
  --modal-border-radius: 25px;

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);
  border-radius: var(--modal-border-radius);
  /* place in center always */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  overflow: hidden;
}

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% - var(--modal-border-radius));
  margin-left: var(--modal-border-radius);
}
.modal-title {
  justify-content: flex-start;
  flex-grow: 1;
}
.modal-close {
  aspect-ratio: 1/1;
  cursor: pointer;
  justify-content: flex-end;
  border-radius: 0 var(--modal-border-radius) 0 0;
  color: inherit;
  background-color: rgba(0, 0, 0, 0.5);
  border-color: #00000000;
  transition: background-color 0.1s ease-in;
}

.modal-close:hover {
  background-color: #b30000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100%;
  width: calc(100% - calc(var(--modal-border-radius) * 2));
  height: calc(100% - var(--modal-border-radius) * 2);
  border-radius: var(--modal-border-radius);
  overflow-x: hidden;
  overflow-y: auto;

  margin: var(--modal-border-radius);
  z-index: 1000;
}

.UIBLOCKER {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  backdrop-filter: blur(10px);
}

/* scaling */
.modal-size {
  min-width: 80%;
  /* min-height: 70%; */
}
</style>
