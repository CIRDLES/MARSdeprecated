import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './tabs.css'

class Tabs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {selected: this.props.selected || 0}
  }

  onClick(i, e) {
    event.preventDefault();
    this.setState({
      selected: i
    })
  }

  renderTabs() {
    const labels = (child, idx) => {
      let activeClass = (this.state.selected === idx ? 'active-tab' : '')
      return (
        <button key={idx} styleName='tab' className={styles[activeClass]} onClick={this.onClick.bind(this, idx)}>
          {child.props.label}
        </button>
      )
    }
    return (
      <span>
        {this.props.children.map(labels.bind(this))}
      </span>
    )
  }

  render() {
    return (
      <div styleName='tabs'>
        {this.renderTabs()}
        <div styleName='content'>
          {this.props.children[this.state.selected]}
        </div>
      </div>
    )
  }
}

export default CSSModules(Tabs, styles)
