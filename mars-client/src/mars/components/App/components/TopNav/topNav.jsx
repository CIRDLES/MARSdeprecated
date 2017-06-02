import FontAwesome from 'react-fontawesome'
import React from 'react'
import CSSModules from 'react-css-modules'
import {IndexLink, Link} from 'react-router'
import styles, {active} from './topNav.css'
import Modal from '../../../common/Modal'

@CSSModules(styles)
class TopNav extends React.Component {
  constructor() {
    super()
    this.state = {menu: ''}
  }

  openHelp() {
    const shell = window.require('electron').shell
    shell.openExternal('https://cirdles.org/projects/mars')
  }

  render() {
    return (
      <div styleName='topNav'>
        <ul>
          <li>
            <IndexLink to='' styleName='link' activeClassName={active}>
              <div>
                <FontAwesome name='info-circle'/>
              </div>
              <div>
                Samples
              </div>
            </IndexLink>
          </li>
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
            <Link to='' styleName='link' onClick={() => this.openHelp()}>
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
