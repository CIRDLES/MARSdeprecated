import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './home.css'

import Nav from './components/Nav'

const Home = ({children, user}) => (
  <div styleName='home'>
    <Nav/>
      {React.cloneElement(children, user)}
  </div>
)

export default CSSModules(Home, styles)
