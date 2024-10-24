import type { Pokemon } from './pokemon'

export interface ResultData {
  name: string
  url: string
}

export interface DataFetched {
  nextPage: boolean
  results: Array<ResultData>
  success: boolean
}

export type PokemonFetched = PokemonFetchedSuccess | PokemonFetchedFailure

interface PokemonFetchedSuccess {
  success: true
  result: Pokemon
}

interface PokemonFetchedFailure {
  success: false
  result: undefined
}
