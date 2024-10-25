import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePokemonStore } from '../pokemon'
import type { Pokemon, PokemonBase, PokemonState } from '@/interfaces/pokemon'
import { usePagesStore } from '../pages'

function mockFetchSuccess() {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: () =>
        Promise.resolve({
          nextPage: true,
          succes: true,
          results: [
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
          ],
          next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        }),
    } as Response),
  )
}

const getPokemonsMock: Array<PokemonBase> = [
  {
    name: 'bulbasaur',
    id: 1,
    favorite: false,
  },
  {
    name: 'ivysaur',
    id: 2,
    favorite: false,
  },
  {
    name: 'venusaur',
    id: 3,
    favorite: false,
  },
]

const pokemonDetailsMocked: Pokemon = {
  id: 555,
  name: 'testPokemon',
  favorite: false,
  height: {
    ft: 20,
  },
  weight: {
    lbs: 10,
  },
  image: {
    front_default: 'image',
  },
  types: [
    {
      id: '1',
      name: 'testType',
      url: 'typeUrl',
    },
  ],
}

const initialState: PokemonState = {
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

describe('Pokemon Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Testing initial state', () => {
    const pokemonStore = usePokemonStore()
    expect(pokemonStore.$state).toEqual(initialState)
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

  it('fetches the pokemon and update the pokemon state', async () => {
    mockFetchSuccess()

    const pokemonStore = usePokemonStore()
    await pokemonStore.getPokemon()
    console.log(pokemonStore.pokemons)
    expect(pokemonStore.pokemons).toEqual(getPokemonsMock)
  })

  it('fetches the pokemon and changes the page', async () => {
    mockFetchSuccess()
    const pokemonStore = usePokemonStore()
    const pagesStore = usePagesStore()
    await pokemonStore.getPokemon()

    expect(pagesStore.getCurrentPage).toEqual(1)
  })

  it('changes favorite property correctly', () => {
    const pokemonStore = usePokemonStore()
    pokemonStore.pokemons = getPokemonsMock

    pokemonStore.toggleFavorite({
      name: 'venusaur',
      id: 3,
      favorite: false,
    })
    expect(pokemonStore.pokemons[2].favorite).toBe(true)
  })

  it('adds a pokemon to favorites', () => {
    const pokemonStore = usePokemonStore()
    pokemonStore.pokemons = getPokemonsMock

    pokemonStore.addToFavorites({
      name: 'venusaur',
      id: 3,
      favorite: false,
    })
    expect(pokemonStore.isFavorite(3)).toBe(true)
  })

  it('automatically orders the favorites array by id', () => {
    const pokemonStore = usePokemonStore()
    pokemonStore.pokemons = getPokemonsMock

    pokemonStore.addToFavorites({ name: 'venusaur', id: 3, favorite: true })
    pokemonStore.addToFavorites({ name: 'bulbasaur', id: 1, favorite: true })

    expect(pokemonStore.getFavoritePokemons).toEqual([
      { name: 'bulbasaur', id: 1, favorite: true },
      { name: 'venusaur', id: 3, favorite: true },
    ])
  })

  it('succesfully remove from favorites', () => {
    const pokemonStore = usePokemonStore()
    pokemonStore.pokemons = getPokemonsMock

    pokemonStore.addToFavorites({ name: 'venusaur', id: 3, favorite: true })
    pokemonStore.addToFavorites({ name: 'bulbasaur', id: 1, favorite: true })
    pokemonStore.removeFromFavorites(3)

    expect(pokemonStore.isFavorite(3)).toBeFalsy()
  })

  it('succesfully clear pokemon details', () => {
    const pokemonStore = usePokemonStore()
    pokemonStore.pokemonDetails = pokemonDetailsMocked
    pokemonStore.clearPokemonDetails()

    expect(pokemonStore.pokemonDetails).toEqual(initialState.pokemonDetails)
  })

  it('succesfully clear pokemons', () => {
    const pokemonStore = usePokemonStore()
    pokemonStore.pokemons = getPokemonsMock

    pokemonStore.clearPokemons()
    expect(pokemonStore.pokemons).toEqual(initialState.pokemons)
  })

  it('succesfully changes the selection state', () => {
    const pokemonStore = usePokemonStore()

    pokemonStore.showFavoritePokemons()
    expect(pokemonStore.pokemonSelection).toEqual('favorite')
  })

  it('starts loading', () => {
    const pokemonStore = usePokemonStore()

    pokemonStore.startLoading()
    expect(pokemonStore.loading).toBeTruthy()
  })

  it('stops loading', () => {
    const pokemonStore = usePokemonStore()

    pokemonStore.startLoading()
    pokemonStore.stopLoading()
    expect(pokemonStore.loading).toBeFalsy()
  })
})
