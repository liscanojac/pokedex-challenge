<template>
  <div class="flex justify-center items-center">
    <div :class="['spinner', spinnerClasses]">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'YourComponent',
  props: {
    spinnerClasses: {
      type: String,
    },
  },
})
</script>

<style scoped>
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
