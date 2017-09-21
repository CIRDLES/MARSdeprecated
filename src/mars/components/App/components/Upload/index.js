import {combineReducers} from 'redux'
import * as reducers from './ducks'

//Upload Component's exposed API
//export {default} from './uploadContainer'
export {default as routes} from './routes'
export const reducer = combineReducers(reducers)
