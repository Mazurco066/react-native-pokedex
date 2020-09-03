import httpClient from './httpClient'

export const listPokemons = async () => 
  await httpClient.get('/pokemon')