import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './uploadCheck.css'
import UploadList from './components/UploadList'
import UploadDetail from './components/UploadDetail'

const UploadCheck = ({uploadSamples}) => (
  <div styleName='uploadCheck'>
    <div styleName='container'>
      <UploadList uploadSamples={uploadSamples}/>
      <UploadDetail  uploadSamples={uploadSamples}/>
    </div>
  </div>
)

export default CSSModules(UploadCheck, styles)
