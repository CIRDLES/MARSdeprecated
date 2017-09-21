import CSSModules from 'react-css-modules'
import FontAwesome from 'react-fontawesome'
import React, {Component} from 'react'

import styles from './modal.css'

class Modal extends Component {
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node
  }

  constructor(props){
      super(props);

      this.state = { isOpen: this.props.show};
  }

  render() {
    if(!this.state.isOpen) {
      return null;
    }

    return (
      <div styleName="backdrop">
        <div styleName="modal">
          {this.props.children}
          <div>
            <button onClick={e => this.setState({isOpen: !this.state.isOpen})}>
              <FontAwesome name="window-close"></FontAwesome>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CSSModules(Modal, styles)
