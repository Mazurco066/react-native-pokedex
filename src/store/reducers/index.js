import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from '@react-native-community/async-storage'

import pokemons from './pokemon'

const persist = (key, reducer) =>
  persistReducer({ key: `POKEDEX/${key}`, storage }, reducer)

const appReducer = combineReducers({
  pokemon: persist('POKEMON_STORAGE', pokemons)
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}
  
export default rootReducer