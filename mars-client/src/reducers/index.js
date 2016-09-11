import {combineReducers} from 'redux'
import user from './userReducer'
import samples from './userSamplesReducer'

const rootReducer = combineReducers({
  user,
  samples
})

export default rootReducer
