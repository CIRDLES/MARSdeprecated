import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Settings from './components/Settings'
import Upload from './uploadContainer'


const routes = (store) => (
  <Route component={Upload}>
    <IndexRoute component={Settings}/>
  </Route>
)

export default routes


const test = ({children}) => (
  <div>
    <h1>TEST</h1>
    {children}
  </div>
)

const test2 = ({children}) => (
  <h2>test2</h2>
)
