import {Component} from 'react'
import {connect} from 'react-redux'
import samplesList from '../components/SamplesList'

import {
  fetchUserSamples
} from '../actions/userSamplesActions'

const mapStateToProps = (state) => {
  const samples = state.samples.toJS()
  return {
    samples,
    usercode: state.user.toJS().usercode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSamples: (usercode) => {
      dispatch(fetchUserSamples(usercode || localStorage.usercode))
    }
  }
}

const SamplesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(samplesList)

export default SamplesList
