export interface PokemonBase {
  id: number
  name: string
  favorite: boolean
}

export interface Pokemon extends PokemonBase {
  height: Height
  weight: Weight
  image: PokemonImageBase
  types: Array<PokemonType>
}

export interface PokemonState {
  loading: boolean
  pokemon: Array<PokemonBase>
  favoritePokemon: FavoritePokemon
  pokemonDetails: Pokemon
}

interface FavoritePokemon {
  [id: number]: PokemonBase
}

interface PokemonImageBase {
  front_default: string
}

interface Height {
  ft: number
}

interface Weight {
  lbs: number
}

interface PokemonType {
  name: string
  id: string
  url: string
}
