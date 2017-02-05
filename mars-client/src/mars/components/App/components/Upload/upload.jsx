import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './upload.css'

const Upload = ({children, settings, uploadSamples}) => (
  <div styleName='upload'>
    {React.cloneElement(children, {...settings, uploadSamples})}
  </div>
)

export default CSSModules(Upload, styles)
