import CSSModules from 'react-css-modules'
import React from 'react'

import Worker from 'worker-loader!../../../../helpers/sandbox'

import styles from './uploadMenu.css'

const UploadMenu = ({uploadSamples, sourceMap, onUpload, toCSV, user}) => {
  const handleOnUpload = (e) => {
    e.preventDefault()
    console.log(user)
    onUpload(sourceMap, uploadSamples, user)
  }

  const handleOnCancel = (e) => {
    e.preventDefault()
    hashHistory.push('/settings/')
  }

  const handleToCSV = (e) => {
    e.preventDefault()
    toCSV()
  }

  return (
    <div styleName='uploadMenu'>
      <button onClick={handleOnUpload}>Upload</button>
      <button onClick={handleOnCancel}>Cancel</button>
      <button id="toCSV" onClick={handleToCSV} disabled={true}>To CSV</button>
    </div>
  )
}

export default CSSModules(UploadMenu, styles)
