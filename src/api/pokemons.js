import httpClient from './httpClient'

export const listPokemons = async (limit = 40, offset = 0) => 
  await httpClient.get(`/pokemon?limit=${limit}&offset=${offset}`)