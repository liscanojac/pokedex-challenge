import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePokemonStore } from '../pokemon'
// import { usePagesStore } from '../pages'
// import { apiService } from '@/services/api.service'
// import type { ResultData } from '@/interfaces/apiService'

vi.mock('@/services/api.service')

// const mockPokemons = [
//   {
//     name: 'bulbasaur',
//     url: 'https://pokeapi.co/api/v2/pokemon/1/',
//   },
//   {
//     name: 'ivysaur',
//     url: 'https://pokeapi.co/api/v2/pokemon/2/',
//   },
//   {
//     name: 'venusaur',
//     url: 'https://pokeapi.co/api/v2/pokemon/3/',
//   },
// ]

// function mockFetchPokemons(resolvedValue: {
//   pokemons: Array<ResultData>
//   nextPage: boolean
//   success: boolean
// }) {
//   // Mock the apiService.fetchPokemons method
//   vi.spyOn(apiService, 'fetchPokemons').mockResolvedValue(resolvedValue)
// }

describe('Pokemon Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Testing initial state', () => {
    const pokemonStore = usePokemonStore()
    expect(pokemonStore.$state).toEqual({
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
    })
  })

  it('Testing startLoading Action', () => {
    const pokemonStore = usePokemonStore()
    pokemonStore.startLoading()
    expect(pokemonStore.loading).toBe(true)
  })

  it('Testing stoptLoading Action', () => {
    const pokemonStore = usePokemonStore()
    pokemonStore.startLoading()
    pokemonStore.stopLoading()
    expect(pokemonStore.loading).toBe(false)
  })

  // it('fetches the pokemon and update the pokemon state', async () => {
  //   mockFetchPokemons({
  //     pokemons: mockPokemons,
  //     nextPage: true,
  //   })

  //   const pokemonStore = usePokemonStore()
  //   await pokemonStore.getPokemon()

  //   expect(pokemonStore.pokemons).toEqual(mockPokemons)
  // })

  // it('fetches the pokemon and changes the page', async () => {
  //   mockFetchPokemons({
  //     pokemons: mockPokemons,
  //     nextPage: true,
  //   })

  //   const pokemonStore = usePokemonStore()
  //   const pagesStore = usePagesStore()
  //   await pokemonStore.getPokemon()

  //   expect(pagesStore.getCurrentPage).toEqual(1)
  // })

  // it('changes favorite property correctly', () => {
  //   const pokemonStore = usePokemonStore()
  //   pokemonStore.pokemons = mockPokemons

  //   pokemonStore.toggleFavorite(3)
  //   expect(pokemonStore.pokemons[2].favorite).toBe(true)
  // })

  // it('adds a pokemon to favorites', () => {
  //   const pokemonStore = usePokemonStore()
  //   pokemonStore.pokemons = mockPokemons

  //   pokemonStore.addToFavorites({ name: 'venusaur', id: 3, favorite: true })

  //   expect(pokemonStore.isFavorite(3)).toBeTruthy()
  // })

  // it('automatically orders the favorites array by id', () => {
  //   const pokemonStore = usePokemonStore()
  //   pokemonStore.pokemons = mockPokemons

  //   pokemonStore.addToFavorites({ name: 'venusaur', id: 3, favorite: true })
  //   pokemonStore.addToFavorites({ name: 'bulbasaur', id: 1, favorite: true })

  //   expect(pokemonStore.getFavoritePokemons).toEqual([
  //     { name: 'bulbasaur', id: 1, favorite: true },
  //     { name: 'venusaur', id: 3, favorite: true },
  //   ])
  // })
  // it('automatically orders the favorites array by id', () => {
  //   const pokemonStore = usePokemonStore()
  //   pokemonStore.pokemons = mockPokemons

  //   pokemonStore.addToFavorites({ name: 'venusaur', id: 3, favorite: true })
  //   pokemonStore.addToFavorites({ name: 'bulbasaur', id: 1, favorite: true })
  //   pokemonStore.removeFromFavorites(3)

  //   expect(pokemonStore.isFavorite(3)).toBeFalsy()
  // })
})
