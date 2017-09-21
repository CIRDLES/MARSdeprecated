import FontAwesome from 'react-fontawesome'
import React from 'react'
import CSSModules from 'react-css-modules'
import {IndexLink, Link} from 'react-router'

import styles, {active} from './sideNav.css'

const SideNav = () => (
  <div styleName='sideNav'>
    <ul>
      <li>
        <IndexLink to='' styleName='link' activeClassName={styles.active}>
          <div>
            <FontAwesome name='info-circle' size='3x'/>
          </div>
          <div>
            Details
          </div>
        </IndexLink>
      </li>
      <li>
        <Link to='upload' styleName='link' activeClassName={active}>
          <div>
            <FontAwesome name='upload' size='3x'/>
          </div>
          <div>
            Upload
          </div>
        </Link>
      </li>
    </ul>
  </div>
)

export default CSSModules(SideNav, styles)
