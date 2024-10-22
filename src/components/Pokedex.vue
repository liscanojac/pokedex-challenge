<template>
  <div class="flex justify-center w-full px-8 md:px-0 lg:px-0">
    <div class="w-full md:w-2/5 lg:w-2/5">
      <List></List>
    </div>
  </div>
  <Navbar></Navbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import List from './List.vue'
import Navbar from './Navbar.vue'

export default defineComponent({
  name: 'PokedexComponent',
  components: {
    List,
    Navbar,
  },
  props: {},
  data() {
    return {
      // Define your data properties here
    }
  },
  methods: {
    // Define your methods here
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
