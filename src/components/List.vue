<template>
  <div class="my-8">
    <div v-for="pokemon in pokemonsToShow" :key="pokemon.id">
      <Card :pokemon="pokemon"></Card>
    </div>
    <Spinner
      v-if="isLoading && pokemonsToShow.length && pokemonSelection === 'all'"
      spinner-classes="w-10 mb-28 mt-5"
    >
      <img src="../assets/Loader.png" alt="loading-spinner" />
    </Spinner>
    <div ref="target"></div>
  </div>
</template>

<script lang="ts">
import { usePokemonStore } from '@/stores/pokemon'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import Card from './Card.vue'
import { usePagesStore } from '@/stores/pages'
import type { PokemonBase } from '@/interfaces/pokemon'
import { useIntersectionObserver } from '@vueuse/core'
import Spinner from './Spinner.vue'

export default defineComponent({
  name: 'ListComponent',
  props: {},
  components: {
    Card,
    Spinner,
  },
  async created() {
    this.startLoading()
    if (!this.apiCallSuccess) await this.showAllPokemon()
    this.resetAPiCallSuccess()
    this.stopLoading()
  },
  mounted() {
    const target = this.$refs.target as HTMLElement
    useIntersectionObserver(target, async ([{ isIntersecting }]) => {
      if (
        isIntersecting &&
        this.pokemonSelection === 'all' &&
        this.getCurrentPage > 0
      ) {
        console.log(this.getCurrentPage)
        this.startLoading()
        if (!this.apiCallSuccess) await this.getPokemon()
        this.resetAPiCallSuccess()
        this.stopLoading()
      }
    })
  },
  computed: {
    ...mapState(usePokemonStore, [
      'pokemons',
      'getFavoritePokemons',
      'pokemonSelection',
      'apiCallSuccess',
      'isLoading',
    ]),
    ...mapState(usePagesStore, ['getCurrentPage']),
    pokemonsToShow(): Array<PokemonBase> {
      return this.pokemonSelection === 'favorite'
        ? this.getFavoritePokemons
        : this.pokemons
    },
  },
  methods: {
    ...mapActions(usePokemonStore, [
      'getPokemon',
      'startLoading',
      'stopLoading',
      'showAllPokemon',
      'resetAPiCallSuccess',
    ]),
    ...mapActions(usePagesStore, ['nextPage']),
  },
})
</script>
