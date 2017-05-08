import React from 'react'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './welcome.css'

const Welcome = () => (
  <div styleName='welcome'>
    <h1>MARS</h1>
    <h2>Middleware Assisting the Registration of Samples</h2>
    <div styleName='logo'></div>
    <Link to='/login'>Get Started</Link>
  </div>
)

export default CSSModules(Welcome, styles)
