import FontAwesome from 'react-fontawesome'
import React from 'react'
import CSSModules from 'react-css-modules'
import {IndexLink, Link} from 'react-router'
import styles, {active} from './topNav.css'

@CSSModules(styles)
class TopNav extends React.Component {
  constructor() {
    super()
    this.state = {menu: ''}
  }

  render() {
    return (
      <div styleName='topNav'>
        <ul>
          <li>
            <Link to='upload' styleName='link' activeClassName={active}>
              <div>
                <FontAwesome name='upload'/>
              </div>
              <div>
                Mapping
              </div>
            </Link>
          </li>
          <li>
            <Link to='/help' styleName='link' activeClassName={active}>
              <div>
                <FontAwesome name='question-circle'/>
              </div>
              <div>
                Help
              </div>
            </Link>
          </li>
          <li>
            <Link to='/logout' styleName='link' activeClassName={active}>
              <div>
                <FontAwesome name='sign-out'/>
              </div>
              <div>
                Sign Out
              </div>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default CSSModules(TopNav, styles)
