import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from './help.css'

const openHelp = () => {
  const shell = window.require('electron').shell
  shell.openExternal('https://cirdles.org/projects/mars')
}

const openIssue = () => {
  const shell = window.require('electron').shell
  shell.openExternal('https://github.com/CIRDLES/MARS/issues/new')
}

const Help = () => (
  <div styleName='help'>
    <div styleName='logo'></div>
    <p>
        <Link to='/help' styleName='link' onClick={()=> openHelp()}>
          Open the MARS help page
        </Link>
    </p>
    <p>
        <Link to='/help' styleName='link' onClick={()=> openIssue()}>
          Submit an issue with MARS
        </Link>
    </p>
  </div>
)

export default CSSModules(Help, styles)
