import {combineReducers} from 'redux'
import {reducer as upload} from './components/Upload'

// App component's Exposed API
export {default as routes} from './routes'
export const reducer = combineReducers({upload})
