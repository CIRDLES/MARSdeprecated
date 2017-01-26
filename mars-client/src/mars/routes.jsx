import React from 'react'
import {Route, IndexRoute} from 'react-router'

import {routes as HomeRoutes} from './components/Home'
import {routes as AppRoutes} from './components/App'
import Mars from './marsContainer'

// This hook function redirects unauthenticated users to the login
const loginHook = (store) => {
  return (location, replaceWith) => {
    if(!store.getState().user.get('usercode')){
      replaceWith('home')
    }
  }
}

const routes = (store) => (
  <Route path='/' component={Mars}>
    <Route onEnter={loginHook(store)}>
      {AppRoutes(store)}
    </Route>
    <Route path='home'>
      {HomeRoutes(store)}
    </Route>
  </Route>
)

export default routes
