import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './upload.css'

const Upload = ({children, settings, actions, user, uploadSamples}) => (
  <div styleName='upload'>
    {React.cloneElement(children, {...settings, ...actions, user, uploadSamples})}
  </div>
)

export default CSSModules(Upload, styles)
