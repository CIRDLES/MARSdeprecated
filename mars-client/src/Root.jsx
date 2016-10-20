import React, {PropTypes} from 'react'
import {Provider, connect} from 'react-redux'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import Home from './components/Home'
import Welcome from './components/Welcome'
import About from './components/About'
import Login from './containers/Login'

import App from './components/App'
import Dashboard from './components/Dashboard'
import SampleDetail from './containers/SampleDetail'
import Upload from './components/Upload'
import SelectCSV from './containers/SelectCSV'
import CheckList from './containers/CheckList'
import UploadDetails from './containers/UploadDetails'

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
        <Route path="/sample/:igsn" component={SampleDetail}/>
        <Route path="/upload" component={Upload}>
          <IndexRoute component={SelectCSV}/>
          <Route path="/check" component={CheckList}/>
          <Route path="/check/:id" component={UploadDetails}/>
        </Route>
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
