import {connect} from 'react-redux'
import samplesList from '../components/SamplesList'

import {
  fetchUserSamples
} from '../actions/userSamplesActions'

const mapStateToProps = (state) => {
  const samples = state.samples.toJS()
  return {
    samples
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSamples: (usercode) => {
      dispatch(fetchUserSamples(localStorage.usercode))
    }
  }
}

const SamplesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(samplesList)

export default SamplesList
