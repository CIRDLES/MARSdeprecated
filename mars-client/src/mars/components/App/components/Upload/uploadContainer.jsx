import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import * as settingsActions from './ducks/settings'
import * as uploadSamplesActions from './ducks/uploadSamples'
import Worker from 'worker-loader!./helpers/sandbox'
import Upload from './upload'

const mapStateToProps = (state) => {
  return {
    settings: {
      sourceMap: state.app.upload.settings.get('sourceMap'),
      sourceFormat: state.app.upload.settings.get('sourceFormat'),
      sourceFiles: state.app.upload.settings.get('sourceFiles')
    },
    uploadSamples: state.app.upload.uploadSamples.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    settings: {
      onChangeMapping: (map) => {
        dispatch(settingsActions.changeMappingSource(map))
      },
      onChangeFormat: (format) => {
        dispatch(settingsActions.changeSourceFormat(format))
      },
      onChangeFiles: (files) => {
        dispatch(settingsActions.changeSourceFiles(files))
      },
      onProceed: (sourceMap, sourceFormat, sourceFiles) => {
        // create a webworker to handle user code in a "sandboxed" environment
        let worker = Worker()
        worker.postMessage({sourceMap, sourceFormat, sourceFiles})
        worker.onmessage = (e) => {
          dispatch(uploadSamplesActions.initializeSamples(e.data))
          hashHistory.push('/upload/')
        }
      }
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    settings: {
      ...stateProps.settings,
      ...dispatchProps.settings
    },
    uploadSamples: stateProps.uploadSamples
  }
}

const UploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Upload)

export default UploadContainer
