import React from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import styles from './nav.css'

@CSSModules(styles)
class Nav extends React.Component {

  constructor() {
    super()
    this.state = {menu: ''}
  }

  toggle() {
    if(this.state.menu) {
      this.setState({menu: ''})
    } else {
      this.setState({menu: 'open'})
    }
  }

  openHelp() {
    const shell = window.require('electron').shell
    shell.openExternal('https://cirdles.org/projects/mars')
  }

  render() {
    return (
      <div styleName='nav'>
        <div styleName='clearfix'>
          <a styleName='toggle' onClick={() => this.toggle()} href="#">&#9776;</a>
        </div>
        <ul styleName={this.state.menu}>
          <li><Link activeClassName="active" to='/'>Welcome</Link></li>
          <li><Link activeClassName="active" to='/about'>About</Link></li>
          <li><Link activeClassName="active" to='/login'>Login</Link></li>
          <li><Link activeClassName="active" to='' onClick={() => this.openHelp()}>Help</Link></li>
        </ul>
      </div>
    )
  }
}

export default CSSModules(Nav, styles)
