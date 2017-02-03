import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Settings from './components/Settings'
import UploadCheck from './components/UploadCheck'
import Upload from './uploadContainer'

// This hook function redirects unauthenticated users to the login
const uploadHook = (store) => {
  return (location, replaceWith) => {
    if(!store.getState().app.upload.uploadSamples.size>0){
      replaceWith('settings')
    }
  }
}

const routes = (store) => (
  <Route component={Upload}>
    <IndexRoute component={UploadCheck} onEnter={uploadHook(store)}/>
    <Route path='/settings' component={Settings}/>
  </Route>
)

export default routes
