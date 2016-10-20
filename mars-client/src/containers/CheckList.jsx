import {connect} from 'react-redux'
import checkList from '../components/CheckList'
import {postSamples} from '../actions/uploadActions'

const mapStateToProps = (state) => {
  const uploads = state.uploads.toJS()
  return {
    uploads
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    post: (samples, e) => {
      return dispatch(postSamples(localStorage.username, localStorage.password, samples))
    }
  }
}

const CheckList = connect(
  mapStateToProps,
  mapDispatchToProps
)(checkList)

export default CheckList
