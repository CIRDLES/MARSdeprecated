import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './panel.css'

const Panel = ({children, name, styleName}) => (
  <div styleName={styleName || 'panel'}>
    <h1 styleName='header'>{name}</h1>
    <div styleName='content'>
      {children}
    </div>
  </div>
)

export default CSSModules(Panel, styles)
