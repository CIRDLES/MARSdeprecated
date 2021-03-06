import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './app'
import Dashboard from './components/Dashboard'
import Detail from './components/Detail'
import Help from './components/Help'
import Logout from './components/TopNav/components/Logout'
import Upload from './components/Upload'

import {routes as UploadRoutes} from './components/Upload'

const routes = (store) => (
  <Route component={App}>
    <IndexRoute component={Detail}/>
    <Route path='help' component={Help}/>
    <Route path='logout' component={Logout}/>
    <Route path='upload'>
      {UploadRoutes(store)}
    </Route>
  </Route>
)

export default routes
