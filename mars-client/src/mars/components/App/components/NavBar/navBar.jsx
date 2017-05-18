import React from 'react';
import MenuItems from './components/menuItems.jsx';
import CSSModules from 'react-css-modules'
import styles from './navBar.css'

class NavBar extends React.Component{

    render() {
        const secondaryMenuItems = (
            this.props.secondaryMenuItems ?

            <MenuItems
                ref="secondaryMenuItems"
                secondary={true}
                items={this.props.secondaryMenuItems}/> :

            null
        );

        return <nav>
          <ul styleName = "navbar">
              <MenuItems ref="menuItems" styleName="menu-items" items={this.props.menuItems}/>
              {secondaryMenuItems}
          </ul>
        </nav>;
    }
}

export default CSSModules(NavBar, styles)
