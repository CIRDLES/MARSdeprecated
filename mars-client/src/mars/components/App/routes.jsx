import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './app'
import Dashboard from './components/Dashboard'
import Detail from './components/Detail'
import Upload from './components/Upload'
import LogoutPage from './components/LogoutPage'

import {routes as UploadRoutes} from './components/Upload'

const routes = (store) => (
  <Route component={App}>
    <IndexRoute component={Detail}/>
    <Route path='upload'>
      {UploadRoutes(store)}
    </Route>
    <Route path="logout" component={LogoutPage}/>
  </Route>
)

export default routes
