import {connect} from 'react-redux'
import sampleDetail from '../components/SampleDetail'

import {fetchSample} from '../actions/sampleDetailActions'

const mapStateToProps = (state, ownProps) => {
  const sample = state.sample.toJS()
  return {
    sample,
    igsn: ownProps.params.igsn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSample: (igsn) => {
      dispatch(fetchSample(localStorage.username, localStorage.password, igsn)).then()
    }
  }
}

const SampleDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(sampleDetail)

export default SampleDetail
