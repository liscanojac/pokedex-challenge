import type { PokemonState } from '@/interfaces/pokemon'
import { defineStore } from 'pinia'
import { usePagesStore } from './pages'
import { apiService } from '@/services/api.service'
import type { DataFetched } from '@/interfaces/apiService'

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => {
    return {
      loading: false,
      pokemon: [],
      favoritePokemon: [],
      pokemonDetails: {
        id: 0,
        name: '',
        favorite: false,
        height: {
          ft: 0,
        },
        weight: {
          lbs: 0,
        },
        image: {
          front_default: '',
        },
        types: [],
      },
    }
  },
  actions: {
    async getPokemon() {
      const pages = usePagesStore()
      const dataFetched: DataFetched = await apiService.fetchPokemons(
        pages.getCurrentPage,
      )
      this.pokemon = dataFetched.pokemons

      if (!dataFetched.nextPage) pages.setLastPageReached()
      pages.nextPage()
    },
    startLoading() {
      this.loading = true
    },
    stopLoading() {
      this.loading = false
    },
  },
})
