import type { PokemonBase, PokemonState } from '@/interfaces/pokemon'
import { defineStore } from 'pinia'
import { usePagesStore } from './pages'
import { apiService } from '@/services/api.service'
import type { DataFetched, PokemonFetched } from '@/interfaces/apiService'

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => {
    return {
      loading: false,
      apiCallSuccess: false,
      pokemonSelection: 'all',
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
    isLoading(): boolean {
      return this.loading
    },
  },
  actions: {
    async getPokemon() {
      const pages = usePagesStore()
      if (pages.lastPage) return
      const dataFetched: DataFetched = await apiService.fetchPokemons(
        pages.getCurrentPage,
      )

      this.apiCallSuccess = dataFetched.success
      if (dataFetched.success) {
        for (let i = 0; i < dataFetched.results.length; i++) {
          const currentResult = dataFetched.results[i]
          const currentResultId = apiService.getIdFromUrl(currentResult.url)
          const pokemon: PokemonBase = {
            name: currentResult.name,
            id: currentResultId,
            favorite: this.isFavorite(currentResultId),
          }
          this.pokemons.push(pokemon)
        }

        if (!dataFetched.nextPage) pages.lastPageReached()
        pages.nextPage()
      }
    },
    async getPokemonDetails(name: string) {
      if (name !== this.pokemonDetails.name) {
        this.clearPokemonDetails()
        const pokemonFetched: PokemonFetched =
          await apiService.getPokemonDetails(name)

        this.apiCallSuccess = pokemonFetched.success
        if (pokemonFetched.success) {
          pokemonFetched.result.favorite = this.isFavorite(
            pokemonFetched.result.id,
          )
          this.pokemonDetails = pokemonFetched.result
        }
      }
    },
    async searchPokemon(name: string) {
      this.pokemonSelection = 'search'
      const pokemonFetched: PokemonFetched =
        await apiService.getPokemonDetails(name)

      this.apiCallSuccess = pokemonFetched.success
      if (pokemonFetched.success) {
        pokemonFetched.result.favorite = this.isFavorite(
          pokemonFetched.result.id,
        )
        this.pokemons = [
          {
            id: pokemonFetched.result.id,
            name: pokemonFetched.result.name,
            favorite: pokemonFetched.result.favorite,
          },
        ]
        this.pokemonDetails = pokemonFetched.result
      }
    },
    startLoading() {
      this.loading = true
    },
    stopLoading() {
      this.loading = false
    },
    toggleFavorite(pokemonToToggle: PokemonBase) {
      const pokemonLoaded = this.pokemons.find(
        pokemon => pokemon.id === pokemonToToggle.id,
      )
      if (pokemonLoaded) pokemonLoaded.favorite = !pokemonLoaded.favorite
      if (this.isFavorite(pokemonToToggle.id)) {
        this.removeFromFavorites(pokemonToToggle.id)
      } else {
        this.addToFavorites(pokemonToToggle)
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
    async showAllPokemon() {
      if (this.pokemons.length < 20) {
        this.clearPokemons()
        await this.getPokemon()
      }
      this.pokemonSelection = 'all'
    },
    showFavoritePokemons() {
      this.pokemonSelection = 'favorite'
    },
    clearPokemons() {
      const pages = usePagesStore()
      pages.resetPages()
      this.resetAPiCallSuccess()
      this.pokemons = []
    },
    resetAPiCallSuccess() {
      this.apiCallSuccess = false
    },
    clearPokemonDetails() {
      this.pokemonDetails = {
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
      }
    },
  },
})
