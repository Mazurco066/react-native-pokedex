import { pokemonTypes } from '../types'

const { POKEMON_LIST_DATA } = pokemonTypes

export const setupPokemonList = payload => ({
  type: POKEMON_LIST_DATA, payload
})
