import {combineReducers} from 'redux'
import user from './userReducer'
import samples from './userSamplesReducer'
import sample from './sampleDetailReducer'
import uploads from './uploadReducer'

const rootReducer = combineReducers({
  user,
  samples,
  sample,
  uploads
})

export default rootReducer
