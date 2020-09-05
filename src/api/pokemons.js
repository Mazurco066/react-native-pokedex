import { httpClientJson } from './httpClient'

export const listPokemons = async () => 
  await httpClientJson.get(`/pokedex.json`)