import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './home.css'

//import Nav from './components/Nav'
import NavBar from '../common/NavBar'

var navData = [
  {
  "text": "Link 1",
  "url": "#"
  },
  {
  "text": "Link 2",
  "url": "#"
  },
  {
  "text": "Link 3",
  "url": "#",
  "submenu": [
    {
      "text": "Sublink 1",
      "url": "#",
      "submenu": [
        {
          "text": "SubSublink 1",
          "url": "#"
        }
      ]
    },
    {
      "text": "Sublink 2",
      "url":"#",
      "submenu": [
        {
          "text": "SubSublink 2",
          "url": "#"
        }
      ]
    }
  ]
  }
]
const Home = ({children, user}) => (
  <div styleName='home'>
    <NavBar items = {navData}/>
      {React.cloneElement(children, user)}
  </div>
)

export default CSSModules(Home, styles)
