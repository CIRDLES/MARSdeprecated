import React from 'react'
import {Link} from 'react-router'

const SamplesListElement = ({children}) => (
  <div>
    <Link to={'/sample/' + children}>
      {children}
    </Link>
  </div>
)

export default SamplesListElement
