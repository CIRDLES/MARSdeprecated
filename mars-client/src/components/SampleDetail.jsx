import React, {Component} from 'react'
import {Link} from 'react-router'

class SampleDetail extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getSample(this.props.igsn)
  }

  render() {
    return (
      <div>
        <h2>{this.props.sample.name}</h2>
        <h3>{this.props.params.igsn}</h3>
        <Link to="/">Back</Link>
      </div>
    )
  }
}

export default SampleDetail
