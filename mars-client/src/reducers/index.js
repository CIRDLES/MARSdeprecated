import {combineReducers} from 'redux'
import user from './userReducer'
import samples from './userSamplesReducer'
import sample from './sampleDetailReducer'
//import uploads from './uploadReducer'

import uploads from './mappingReducer'

const rootReducer = combineReducers({
  user,
  samples,
  sample,
  uploads
})

export default rootReducer
