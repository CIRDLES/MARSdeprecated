import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './topNav.css'

const TopNav = ({className}) => (
  <div styleName='topNav' className={className}>
  </div>
)

export default CSSModules(TopNav, styles)
