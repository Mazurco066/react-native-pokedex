import httpClient, { httpClientJson } from './httpClient'

export const listPokemons = async () => 
  await httpClientJson.get(`/pokedex.json`)

export const pokemonDetails = async (id) =>
  await httpClient.get(`/pokemon/${id}`)