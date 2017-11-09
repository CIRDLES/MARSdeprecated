import CSSModules from 'react-css-modules'
import {hashHistory} from 'react-router'
import React from 'react'

import Worker from 'worker-loader!../../../../helpers/sandbox'

import styles from './uploadMenu.css'

const UploadMenu = ({uploadSamples, sourceMap, onUpload, user}) => {
  var sampleData = [
    {
        FACILITY_CODE: "SIO",
        SAMPLE: "SHOW02HO-001G"
    },
    {
        FACILITY_CODE: "SIO",
        SAMPLE: "SHOW02HO-002G"
    },
    {
        FACILITY_CODE: "SIO",
        SAMPLE: "SHOW02HO-003G"
    },
  ]

  const handleOnUpload = (e) => {
    e.preventDefault()
    console.log(user)
    onUpload(sourceMap, uploadSamples, user)
  }

  const handleOnCancel = (e) => {
    e.preventDefault()
    hashHistory.push('/settings/')
  }

  const convertArrayOfObjectsToCSV = (e) => {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = e.data || null
    if (data == null || !data.length) {
      return null
    }

    columnDelimiter = e.columnDelimiter || ','
    lineDelimiter = e.lineDelimiter || '\n'

    keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    data.forEach(function(item) {
        ctr = 0
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key]
            ctr++
        })
        result += lineDelimiter
    })

    return result
  }

  //convert uploadSamples into array like sampleData
  const convertToArray = (data) => {
    return data
  }

  const downloadCSV = (e) => {
    var data, filename, link

    console.log(uploadSamples)

    var csv = convertArrayOfObjectsToCSV({
        data: convertToArray(sampleData)
    })
    if (csv == null) return

    filename = 'samples.csv'    //change to original file name with identifier

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv
    }
    data = encodeURI(csv)

    link = document.createElement('a')
    link.setAttribute('href', data)
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <div styleName='uploadMenu'>
      <button onClick={handleOnUpload}>Upload</button>
      <button onClick={handleOnCancel}>Cancel</button>
      <button id="toCSV" onClick={downloadCSV} disabled={true}>To CSV</button>
    </div>
  )
}

export default CSSModules(UploadMenu, styles)
