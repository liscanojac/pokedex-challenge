import type {
  DataFetched,
  PokemonFetched,
  ResultData,
} from '@/interfaces/apiService'
import type { Pokemon } from '@/interfaces/pokemon'
// import type { PokemonBase } from '@/interfaces/pokemon'

const defaultPokemonLimit = 20
export const apiService = {
  async fetchPokemons(
    page: number,
    pokemonPerPage: number = defaultPokemonLimit,
  ): Promise<DataFetched> {
    let url = import.meta.env.VITE_API_URL
    if (page) url += `?offset=${pokemonPerPage * page}&limit=${pokemonPerPage}`

    const response = await fetch(url)

    if (!response.ok) {
      console.error(`Response status: ${response.status}`)
      return {
        success: false,
        results: [],
        nextPage: false,
      }
    }

    const data = await response.json()
    const results: Array<ResultData> = data.results
    const nextPage: boolean = !!data.next

    return { results, nextPage, success: response.ok }
  },
  getIdFromUrl(url: string): number {
    const urlParts = url.split('/')
    if (!urlParts[urlParts.length - 1]) urlParts.pop()
    return Number(urlParts.pop())
  },
  async getPokemonDetails(name: string): Promise<PokemonFetched> {
    const url = `${import.meta.env.VITE_API_URL}/${name}`

    const response = await fetch(url)

    if (!response.ok) {
      console.error(`Response status: ${response.status}`)
      return {
        success: false,
        result: undefined,
      }
    }
    const data = await response.json()

    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      favorite: false,
      image: {
        front_default: data.sprites.other['official-artwork'].front_default,
      },
      height: data.height,
      weight: data.weight,
      types: data.types.map(
        (type: {
          slot: number
          type: {
            name: string
            url: string
          }
        }) => {
          return {
            id: type.slot,
            name: type.type.name,
            url: type.type.url,
          }
        },
      ),
    }

    return {
      success: true,
      result: pokemon,
    }
  },
}
