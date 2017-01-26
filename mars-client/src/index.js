import configureStore from './configureStore'
import {Map} from 'immutable'
import {Provider} from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import {Router, hashHistory} from 'react-router'

import {localState, saveState} from './helpers/localStorage'
import routes from './mars/routes'

//setup global css
import Normalize from 'normalize.css'
import FontAwesome from 'font-awesome-webpack'

// get persistant state from local storage
const persistedState = localState()
if(persistedState) {
  persistedState.user = Map(persistedState.user)
}

const store = configureStore(persistedState)

// update localStorage with persistant elements
store.subscribe(() => {
  saveState({
    user: {
      username: store.getState().user.get('username'),
      password: store.getState().user.get('password'),
      usercode: store.getState().user.get('usercode')
    }
  })
})

const App = () => (
  <Provider store={store}>
  <Router history={hashHistory} routes={routes(store)}/>
  </Provider>
)

render (
  <App/>,
  document.getElementById('app')
)
