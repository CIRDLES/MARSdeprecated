import {connect} from 'react-redux'
import uploadDetails from '../components/UploadDetails'

const mapStateToProps = (state) => {
  const uploads = state.uploads.toJS()
  return {
    uploads
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const UploadDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(uploadDetails)

export default UploadDetails
