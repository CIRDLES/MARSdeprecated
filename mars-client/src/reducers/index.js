import {combineReducers} from 'redux'
import user from './userReducer'
import samples from './userSamplesReducer'
import sample from './sampleDetailReducer'

const rootReducer = combineReducers({
  user,
  samples,
  sample
})

export default rootReducer
