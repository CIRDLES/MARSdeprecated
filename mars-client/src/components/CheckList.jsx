import React from 'react'
import {Link} from 'react-router'

const CheckList = ({uploads, post}) => {
  return (
    <div>
      <h3>Check</h3>
      {uploads.map((sample, i) => (
        <div key={i}><Link to={"/check/" + i}>{sample.name}</Link></div>
      ))}
      <button onClick={post.bind(this, uploads)}>Upload</button>
    </div>
  )
}

export default CheckList
