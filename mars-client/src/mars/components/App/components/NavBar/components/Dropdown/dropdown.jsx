import React from 'react';
import Item from '../item';
import CSSModules from 'react-css-modules'
import styles from './dropdown.css'

class Dropdown extends React.Component{
    constructor(props, context) {
      super(props, context);
      this.state = {
        dropdownIsActive: false,
        dropdownIsVisible: false,
        open: false
      };
    }

    onClick(i, e) {
      event.preventDefault();
      this.setState({
        selected: i
      })
    }

    displayItems() {
      if (this.state.open) {
        return this.props.items.map((item, index) => {
            const ref = `i${index}`;
            return <Item {...item} ref={ref} key={ref}/>;
        })
      }
    }

    render() {
        return (
            <li styleName="dropdown">
              <a href="#" onClick={e => this.setState({open: !this.state.open})} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  {this.props.title}

              </a>

              <ul styleName="dropdown-items">
                  {this.displayItems()}
              </ul>
            </li>
        );
    }
};


export default CSSModules(Dropdown, styles)
