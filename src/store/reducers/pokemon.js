import { pokemonTypes } from '../types'

const { POKEMON_LIST_DATA } = pokemonTypes

const initialState = {
  list: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POKEMON_LIST_DATA:
      return {
        ...state,
        list: payload
      }
    default:
      return state
  }
}
