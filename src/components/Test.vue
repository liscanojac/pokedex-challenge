<template>
  <div>
    <!-- Your template here -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PokemonBase } from '@/interfaces/pokemon'
import { mapActions, mapState } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'

export default defineComponent({
  name: 'TestComponent',
  props: {},
  data() {
    return {
      // Define your data properties here
      pokemons: [] as Array<PokemonBase>,
    }
  },
  async created() {
    this.startLoading()
    await this.getPokemon()
    this.stopLoading()
  },
  computed: {
    ...mapState(usePokemonStore, ['loading']),
  },
  methods: {
    // Define your methods here
    ...mapActions(usePokemonStore, [
      'getPokemon',
      'startLoading',
      'stopLoading',
    ]),
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
