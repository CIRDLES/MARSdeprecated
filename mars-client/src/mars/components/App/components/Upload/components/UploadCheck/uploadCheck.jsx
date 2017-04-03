import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './uploadCheck.css'
import UploadList from './components/UploadList'
import UploadDetail from './components/UploadDetail'

const filterSamples = (samples, filterBy) => {
  //return samples.filter(field => field.key == filterBy).map(sample => sample.value)
  return samples
}

const UploadCheck = ({uploadSamples, params}) => (
  <div styleName='uploadCheck'>
    <div styleName='container'>
      <UploadList uploadSamples={uploadSamples}/>
      <UploadDetail sample={uploadSamples[params.sampleId]}/>
    </div>
  </div>
)

export default CSSModules(UploadCheck, styles)
