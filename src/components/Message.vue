<template>
  <div class="flex flex-col items-center justify-center text-center">
    <h1 :class="['text-4xl font-bold my-2', titleClasses]">{{ title }}</h1>
    <h3 :class="['text-xl my-2', msgClasses]">{{ msg }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessageComponent',
  props: {
    title: {
      type: String,
    },
    msg: {
      type: String,
    },
    titleClasses: {
      type: String,
    },
    msgClasses: {
      type: String,
    },
  },
})
</script>
