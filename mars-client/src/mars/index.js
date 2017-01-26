import {combineReducers} from 'redux'
import * as marsReducers from './ducks'
import {reducer as app} from './components/App'

// MARS component's Exposed API
export {default as routes} from './routes'
export const reducer = combineReducers({...marsReducers, app})
