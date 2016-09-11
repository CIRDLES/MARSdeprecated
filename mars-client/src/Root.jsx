import React, {PropTypes} from 'react'
import {Provider, connect} from 'react-redux'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import Home from './components/Home'
import Welcome from './components/Welcome'
import About from './components/About'
import Login from './containers/Login'

import App from './components/App'
import Dashboard from './components/Dashboard'

const Root = ({store}) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/home" component={Home}>
        <IndexRoute component={Welcome}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
      </Route>
      <Route path="/" component={App} onEnter={requireAuth}>
        <IndexRoute component={Dashboard}/>
      </Route>
    </Router>
  </Provider>
)

// This hook function redirects unauthenticated users to the login
function requireAuth(nextState, replace) {
  if(!localStorage.usercode) {
    replace({
      pathname: '/home'
    })
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
