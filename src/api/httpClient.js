import axios from 'axios'
// eslint-disable-next-line import/no-unresolved
import { BASE_URL } from '@env'

export default axios.create({
  baseURL: BASE_URL
})
