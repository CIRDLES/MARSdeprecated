import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './uploadCheck.css'
import UploadList from './components/UploadList'
import UploadDetail from './components/UploadDetail'
import UploadMenu from './components/UploadMenu'

const UploadCheck = ({uploadSamples, sourceMap, user, ui, onUpload, onCancel, params}) => (
  <div styleName='uploadCheck'>
    <UploadMenu onUpload={onUpload} onCancel={onCancel} uploadSamples={uploadSamples} user={user} sourceMap={sourceMap}/>
    <div styleName='container'>
      <UploadList uploadSamples={uploadSamples}/>
      <UploadDetail sample={uploadSamples[params.sampleId]}/>
    </div>
  </div>
)

export default CSSModules(UploadCheck, styles)
