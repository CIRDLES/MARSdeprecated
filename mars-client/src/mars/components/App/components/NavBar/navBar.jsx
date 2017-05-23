import React, { Component } from 'react';
import MenuItems from './components/menuItems.jsx';
import CSSModules from 'react-css-modules'
import styles from './navBar.css'

class NavBar extends Component{
    render() {
        return <nav>
          <ul styleName = "navbar">
              <MenuItems ref="menuItems" styleName="menu-items" items={this.props.menuItems}/>
          </ul>
        </nav>;
    }
}

export default CSSModules(NavBar, styles)
