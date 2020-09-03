import { authTypes } from '../types'

const { HYDRATE_AUTH_DATA, USER_LOGGED_OUT } = authTypes

export const hydrateAuthData = payload => ({
  type: HYDRATE_AUTH_DATA,
  payload
})

export const userLogOut = () => ({
  type: USER_LOGGED_OUT
})
