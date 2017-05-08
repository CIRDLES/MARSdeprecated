import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './home.css'

const Home = ({children, user}) => (
  <div styleName='home'>
      {React.cloneElement(children, user)}
  </div>
)

export default CSSModules(Home, styles)
