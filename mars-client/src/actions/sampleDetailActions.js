import fetch from 'isomorphic-fetch'
import {
  FETCH_SAMPLE_REQUEST,
  FETCH_SAMPLE_SUCCESS,
  FETCH_SAMPLE_FAILURE
} from '../actionTypes'
import {BASE_URL, FETCH_SAMPLE_ENDPOINT} from '../constants'
import handleErrors from '../fetchErrorHandler'

// Creates an action which signals the beginning of an asynchronous call to the
// server for a specific sample
export function fetchSampleRequest() {
  return {
    type: FETCH_SAMPLE_REQUEST
  }
}

// Creates an action which signals the successful completion of an asynchronous
// call to the server for a specific sample
export function fetchSampleSuccess(sample) {
  return {
    type: FETCH_SAMPLE_SUCCESS,
    sample
  }
}

// Creates an action which signals the unsuccessful completion of an asynchronous
// call to the server for a specific sample
export function fetchSampleFailure(error) {
  return {
    type: FETCH_SAMPLE_FAILURE,
    error
  }
}

// A redux-thunk function which initiates the asynchronous request for a sample
// by its IGSN. It handles when and where the above action creators get called
export function fetchSample(username, password, igsn) {
  return dispatch => {
    dispatch(fetchSampleRequest())
    var headers = new Headers()
    headers.append('Accept', 'application/json')
    var request = {method: 'GET', headers}
    return fetch(BASE_URL + FETCH_SAMPLE_ENDPOINT + (igsn ? '?igsn=' + igsn : ''), request)
      .then(handleErrors)
      .then(response => response.json())
      .then(response => dispatch(fetchSampleSuccess(response.sample)))
      .catch(response => {
        if(response.message === "400")
          dispatch(fetchSampleFailure('Bad Request - IGSN is invalid.'))
        else if(response.message === "403")
          dispatch(fetchSampleFailure('Forbidden - IGSN has either been deactivated or non public.'))
        else if(response.message === "404")
          dispatch(fetchSampleFailure('Not Found - IGSN not found.'))
        else
          dispatch(fetchSampleFailure('Network connectivity error. Check your network connection.'))
      })
  }
}
