import CSSModules from 'react-css-modules'
import React from 'react'

import defaultStyles from './panel.css'

const Panel = ({children, name, style}) => {

  return (
  <div styleName={'panel'} style={style}>
    <h1 styleName='header'>{name}</h1>
    <div styleName='content'>
      {children}
    </div>
  </div>
)}

export default CSSModules(Panel, defaultStyles)
