import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './app.css'
import SideNav from './components/SideNav'
import TopNav from './components/TopNav'

const App = ({children}) => (
  <div styleName='app'>
    <TopNav className={styles.topNav}/>
    <div className={styles.main}>
      <SideNav className={styles.sideNav}/>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  </div>
)

export default CSSModules(App, styles)
