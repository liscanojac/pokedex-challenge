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

export interface PokemonDetails extends Pokemon {
  image: PokemonImage
  gif: {
    back: string
    front: string
  }
  happiness: number
  capture_rate: number
  description: string
  generation: string
  growth_rate: string
  is_legendary: boolean
  is_mythical: boolean
  shape: string
  ability: Array<PokemonAbility>
}

export interface PokemonState {
  loading: boolean
  apiCallSuccess: boolean
  pokemonSelection: PokemonSelection
  pokemons: Array<PokemonBase>
  favoritePokemons: FavoritePokemon
  pokemonDetails: Pokemon
}

type PokemonSelection = 'all' | 'favorite' | 'search'

export interface FavoritePokemon {
  [id: number]: PokemonBase
}

interface PokemonImageBase {
  front_default: string
}

interface PokemonImage extends PokemonImageBase {
  back_default: string
  svg: string
  official_artwork: string
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
interface PokemonAbility {
  name: string
  id: string
  url: string
}
