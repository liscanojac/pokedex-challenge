import type { PokemonBase, PokemonState } from '@/interfaces/pokemon'
import { defineStore } from 'pinia'
import { usePagesStore } from './pages'
import { apiService } from '@/services/api.service'
import type { DataFetched } from '@/interfaces/apiService'

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => {
    return {
      loading: false,
      pokemons: [],
      favoritePokemons: {},
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
  getters: {
    getFavoritePokemons(): Array<PokemonBase> {
      return Object.values(this.favoritePokemons)
    },
    getPokemons(): Array<PokemonBase> {
      return this.pokemons
    },
  },
  actions: {
    async getPokemon() {
      const pages = usePagesStore()
      const dataFetched: DataFetched = await apiService.fetchPokemons(
        pages.getCurrentPage,
      )
      this.pokemons = dataFetched.pokemons

      if (!dataFetched.nextPage) pages.lastPageReached()
      pages.nextPage()
    },
    startLoading() {
      this.loading = true
    },
    stopLoading() {
      this.loading = false
    },
    toggleFavorite(id: number) {
      const pokemonToToggle = this.pokemons.find(pokemon => pokemon.id === id)
      if (pokemonToToggle) {
        pokemonToToggle.favorite = !pokemonToToggle.favorite
        if (pokemonToToggle.favorite === true) {
          this.addToFavorites(pokemonToToggle)
        } else {
          this.removeFromFavorites(pokemonToToggle.id)
        }
      }
    },
    addToFavorites(pokemon: PokemonBase) {
      this.favoritePokemons[pokemon.id] = pokemon
    },
    removeFromFavorites(id: number) {
      delete this.favoritePokemons[id]
    },
    isFavorite(id: number): boolean {
      return !!this.favoritePokemons[id]
    },
  },
})
