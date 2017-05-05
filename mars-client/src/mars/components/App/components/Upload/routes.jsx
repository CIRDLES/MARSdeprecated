import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'

import Settings from './components/Settings'
import UploadCheck from './components/UploadCheck'
import Upload from './uploadContainer'

// This hook function redirects unauthenticated users to the login
const uploadHook = (store) => {
  return (location, replaceWith) => {
    if(!store.getState().app.upload.uploadSamples.get('samples').size>0){
      replaceWith('settings')
    }
  }
}

const routes = (store) => (
  <Route component={Upload}>
    <IndexRedirect  to='/check/0'/>
    <Route path='/settings' component={Settings}/>
    <Route path='/check' component={UploadCheck} onEnter={uploadHook(store)}>
      <Route path=':sampleId'/>
    </Route>
  </Route>
)

export default routes
