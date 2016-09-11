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

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps)
  return {
    getSample: (igsn) => {
      dispatch(fetchSample(localStorage.username, localStorage.password, igsn))
    }
  }
}

const SampleDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(sampleDetail)

export default SampleDetail
