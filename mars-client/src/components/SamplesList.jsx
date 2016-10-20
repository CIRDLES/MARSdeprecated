import React, {Component} from 'react'
import {Link} from 'react-router'

import SamplesListElement from './SamplesListElement'

class SamplesList extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchSamples(this.props.usercode)
  }

  render() {
    return (
      <div>
        <Link to='upload'>Upload Samples</Link>
        <h3>Previous Samples</h3>
        {this.props.samples.map(sample => (
          <SamplesListElement key={sample}>{sample}</SamplesListElement>
        ))}
      </div>
    )
  }
}

export default SamplesList
