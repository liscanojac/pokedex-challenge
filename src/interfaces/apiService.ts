import type { PokemonBase } from './pokemon'

export interface ResultData {
  name: string
  url: string
}

export interface DataFetched {
  nextPage: boolean
  pokemons: Array<PokemonBase>
}
