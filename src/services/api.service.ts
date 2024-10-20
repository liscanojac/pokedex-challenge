import type { DataFetched, ResultData } from '@/interfaces/apiService'
import type { PokemonBase } from '@/interfaces/pokemon'

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
      throw new Error(`Response status: ${response.status}`)
    }

    const data = await response.json()
    const results: Array<ResultData> = data.results
    const nextPage: boolean = !!data.next
    const pokemons: Array<PokemonBase> = []

    for (let i = 0; i < results.length; i++) {
      const pokemon: PokemonBase = {
        name: results[i].name,
        id: this.getIdFromUrl(results[i].url),
        favorite: false,
      }
      pokemons.push(pokemon)
    }

    return { pokemons, nextPage }
  },
  getIdFromUrl(url: string): number {
    return Number(url.slice(-2, -1))
  },
}
