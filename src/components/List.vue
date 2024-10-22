<template>
  <div v-for="pokemon in pokemonsToShow" :key="pokemon.id" @scroll="testFunc">
    <Card :pokemon="pokemon"></Card>
  </div>
</template>

<script lang="ts">
import { usePokemonStore } from '@/stores/pokemon'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import Card from './Card.vue'
import { usePagesStore } from '@/stores/pages'
import type { PokemonBase } from '@/interfaces/pokemon'

export default defineComponent({
  name: 'ListComponent',
  props: {},
  components: {
    Card,
  },
  async created() {
    this.startLoading()
    await this.getPokemon()
    this.stopLoading()
  },
  computed: {
    ...mapState(usePokemonStore, [
      'pokemons',
      'getFavoritePokemons',
      'favoriteSelected',
    ]),
    pokemonsToShow(): Array<PokemonBase> {
      return this.favoriteSelected ? this.getFavoritePokemons : this.pokemons
    },
  },
  methods: {
    ...mapActions(usePokemonStore, [
      'getPokemon',
      'startLoading',
      'stopLoading',
    ]),
    ...mapActions(usePagesStore, ['nextPage']),
    testFunc() {
      console.log('marico')
    },
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
