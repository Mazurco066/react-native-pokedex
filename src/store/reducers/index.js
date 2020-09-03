import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from '@react-native-community/async-storage'

import auth from './auth'

const persist = (key, reducer) =>
  persistReducer({ key: `RN.TEMPLATE/${key}`, storage }, reducer)

const appReducer = combineReducers({
  auth: persist('AUTH_STORAGE', auth)
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}
  
export default rootReducer