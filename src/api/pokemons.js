import httpClient, { httpClientJson2 } from './httpClient'

export const listPokemons = async () => 
  await httpClientJson2.get(`/pokedex.json`)

export const pokemonDetails = async (id) =>
  await httpClient.get(`/pokemon/${id}`)