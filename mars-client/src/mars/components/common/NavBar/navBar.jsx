import CSSModules from 'react-css-modules'
import NavBarItem from './navBarItem'
import React from "react";
import ReactDOM from "react-dom";
import styles from './navBar.css'

const NavBar = ({items}) => {
  const generateItem = (item, index) => (
    <NavBarItem key={index} text={item.text} url={item.url} submenu={item.submenu}/>
  )
  var items = items.map(generateItem);
  return (
    <ul styleName="navbar">
      {items}
    </ul>
  )
}

export default CSSModules(NavBar, styles)
