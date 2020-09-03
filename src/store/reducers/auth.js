import { authTypes } from '../types'

const { HYDRATE_AUTH_DATA } = authTypes

const initialState = {
  authData: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HYDRATE_AUTH_DATA:
      return {
        ...state,
        authData: payload
      }
    default:
      return state
  }
}
