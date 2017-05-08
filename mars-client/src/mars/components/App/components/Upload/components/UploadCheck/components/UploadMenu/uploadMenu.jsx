import CSSModules from 'react-css-modules'
import React from 'react'

import Worker from 'worker-loader!../../../../helpers/sandbox'

import styles from './uploadMenu.css'

const UploadMenu = ({uploadSamples, sourceMap, onUpload, user}) => {

  const handleOnUpload = (e) => {
    e.preventDefault()
    console.log(user)
    onUpload(sourceMap, uploadSamples, user)
  }

  return (
    <div styleName='uploadMenu'>
      <button onClick={handleOnUpload}>Upload</button>
      <button>Cancel</button>
      <button>To CSV</button>
    </div>
  )
}

export default CSSModules(UploadMenu, styles)
