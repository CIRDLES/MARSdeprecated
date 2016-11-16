import {connect} from 'react-redux'
import selectCSV from '../components/SelectCSV'
import {addUploads} from '../actions/uploadActions'

import {csvFilesReader} from '../lib/rawDataProcessingModule'
import * as actions from '../actions/initializeSamplesActions'

// Scripps stuff hardcoded for now
import map from '../server/scrippsMap.json'

// Temporary
import {loadModule, listModules} from '../lib/loadOrganization'

console.log(listModules())

loadModule('defaultMappingLogic')


const mapStateToProps = (state) => {
  const uploads = state.uploads.toJS()
  return {
    uploads
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpload: (e) => {
      let files = e.target.files

      csvFilesReader(files)
        .then((data) => {
          // iterate through data rows
          for(let i=0; i<data.length; i++) {
            // iterate through a row's keys
            for(let key in data[i]) {
              if(map[key] && data[i][key]) {
                // iterate through the map's mapping functions
                for(let j=0; j<map[key].length; j++) {
                  dispatch(actions[map[key][j]](i, data[i][key], key))
                }
              }
            }
          }
        })

    }
  }
}

const SelectCSV = connect(
  mapStateToProps,
  mapDispatchToProps
)(selectCSV)

export default SelectCSV
