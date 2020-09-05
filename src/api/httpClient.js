import axios from 'axios'
// eslint-disable-next-line import/no-unresolved
import { BASE_URL, BASE_URL_JSON } from '@env'

export default axios.create({
  baseURL: BASE_URL
})

export const httpClientJson = axios.create({
  baseURL: BASE_URL_JSON
})