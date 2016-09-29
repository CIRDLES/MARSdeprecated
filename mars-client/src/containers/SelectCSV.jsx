import {connect} from 'react-redux'
import selectCSV from '../components/SelectCSV'
import {addUploads} from '../actions/uploadActions'
import {csvParse} from 'd3-dsv'

import dataMap from '../../maps/scripps.json'
import sampleMap from '../lib/sampleMap'


const mapStateToProps = (state) => {
  const uploads = state.uploads.toJS()
  return {
    uploads
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpload: (e) => {
      const uploadSamples = []
      let files = e.target.files
      let filesLoaded = 0

      for(let i=0; i<files.length; i++) {
        let reader = new FileReader()
        reader.onload = (e) => {
          let rows = csvParse(e.target.result)
          for(let j=0; j<rows.length; j++) {
            uploadSamples[j] = {...uploadSamples[j], ...rows[j]}
          }
          filesLoaded++
          if(filesLoaded == files.length) {
            for(let j=0; j<uploadSamples.length; j++) {
              uploadSamples[j] = sampleMap(uploadSamples[j], dataMap)
            }
            dispatch(addUploads(uploadSamples))
          }
        }
        reader.readAsText(files[i])
      }
    } 
  }
}

const SelectCSV = connect(
  mapStateToProps,
  mapDispatchToProps
)(selectCSV)

export default SelectCSV
