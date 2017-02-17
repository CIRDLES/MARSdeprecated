import configureStore from './configureStore'
import {Map} from 'immutable'
import {Provider} from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import {Router, hashHistory} from 'react-router'

import {getLocalState, setLocalState} from './helpers/localStorage'
import {getSessionState, setSessionState} from './helpers/sessionStorage'
import routes from './mars/routes'

//setup global css
import Normalize from 'normalize.css'
import FontAwesome from 'font-awesome-webpack'

// get persistant state from local storage
let persistedLocalState = getLocalState()
let persistedSessionState = getSessionState()
let persistedState = {...persistedLocalState, ...persistedSessionState}
if(persistedState) {
  persistedState.user = Map(persistedState.user)
}

const store = configureStore(persistedState)

// update localStorage with persistant elements
store.subscribe(() => {
  let persistedState = {
    user: {
      username: store.getState().user.get('username'),
      password: store.getState().user.get('password'),
      usercode: store.getState().user.get('usercode'),
      isPersisted: store.getState().user.get('isPersisted')
    }
  }
  //use localStorage is user wants info to be remembered
  if (persistedState.user.isPersisted) {
    setLocalState(persistedState)
    sessionStorage.removeItem("state")
  }
  //use sessionStorage if user doesn't want info stored
  else {
    setSessionState(persistedState)
    localStorage.removeItem("state")
  }
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
