import React from 'react'
import {Link} from 'react-router'

const UploadDetails = ({uploads, params}) => {
  return (
    <div>
      <h3>Details</h3>
      <div>{uploads[params.id].name}</div>
      <div>{uploads[params.id].igsn}</div>
      <div>{uploads[params.id].collector}</div>
      <div>{uploads[params.id].platform_name}</div>
      <Link to={"/check"}>Back</Link>
    </div>
  )
}

export default UploadDetails
