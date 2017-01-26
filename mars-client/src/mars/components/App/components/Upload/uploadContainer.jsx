import {connect} from 'react-redux'

import * as actions from './ducks/settings'
import Worker from 'worker-loader!./helpers/sandbox'
import Upload from './upload'

const mapStateToProps = (state) => {
  return {
    settings: {
      sourceMap: state.app.upload.settings.get('sourceMap'),
      sourceFormat: state.app.upload.settings.get('sourceFormat'),
      sourceFiles: state.app.upload.settings.get('sourceFiles')
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    settings: {
      onChangeMapping: (map) => {
        dispatch(actions.changeMappingSource(map))
      },
      onChangeFormat: (format) => {
        dispatch(actions.changeSourceFormat(format))
      },
      onChangeFiles: (files) => {
        dispatch(actions.changeSourceFiles(files))
      },
      onProceed: (sourceMap, sourceFormat, sourceFiles) => {
        // create a webworker to handle user code in a "sandboxed" environment
        let worker = Worker()
        worker.postMessage({sourceMap, sourceFormat, sourceFiles})
        worker.onmessage = (e) => {
          console.log(e.data)
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
    }
  }
}

const UploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Upload)

export default UploadContainer
