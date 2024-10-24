<template>
  <button
    type="button"
    v-if="pill"
    :class="[
      'py-1 md:py-2 lg:py-2 text-white w-full',
      defaultClasses,
      buttonClass,
    ]"
    @click="() => clickAction()"
  >
    <slot name="iconLeft"></slot>
    <h3 class="mx-2">{{ btnTitle }}</h3>
    <slot name="iconRight"></slot>
  </button>
  <div>
    <button
      type="button"
      v-if="rounded"
      :class="[defaultClasses, buttonClass]"
      :style="{
        width: `${radius}rem`,
        height: `${radius}rem`,
      }"
      @click="() => clickAction()"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtnComponent',
  props: {
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    radius: {
      type: String,
      required: false,
      default: `2.75`,
    },
    pill: {
      type: Boolean,
      required: false,
      default: false,
    },
    buttonClass: {
      type: String,
      required: false,
    },
    clickAction: {
      type: Function,
      required: true,
    },
    btnTitle: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      defaultClasses:
        'flex items-center justify-center group m-1 rounded-full focus:outline-none',
    }
  },
})
</script>
