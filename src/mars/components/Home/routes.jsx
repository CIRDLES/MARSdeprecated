import React from 'react'
import {Route, IndexRoute} from 'react-router'

import About from './components/About'
import Login from './components/Login'
import Welcome from './components/Welcome'
import Home from './home'


const routes = (store) => (
  <Route component={Home}>
    <IndexRoute component={Welcome}/>
    <Route path='/about' component={About}/>
    <Route path='/login' component={Login}/>
  </Route>
)

export default routes
