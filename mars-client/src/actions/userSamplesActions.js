import {
  FETCH_USER_SAMPLES_REQUEST,
  FETCH_USER_SAMPLES_SUCCESS,
  FETCH_USER_SAMPLES_FAILURE
} from '../actionTypes'
import {BASE_URL, USER_SAMPLES_ENDPOINT} from '../constants'
import handleErrors from '../fetchErrorHandler'

// Creates an action which signals the beginning of an asynchronous request to
// retrieve a user's previous uploads
export function fetchUserSamplesRequest() {
  return {
    type: FETCH_USER_SAMPLES_REQUEST
  }
}

// Creates an action which signals the successful completion of an asynchronous
// request to retrieve a user's previous uploads
export function fetchUserSamplesSuccess(samples) {
  return {
    type: FETCH_USER_SAMPLES_SUCCESS,
    samples
  }
}

// Creates an action which signals the unsuccessful completion of an asynchronous
// request to retrieve a user's previous uploads
export function fetchUserSamplesFailure(error) {
  return {
    type: FETCH_USER_SAMPLES_FAILURE,
    error
  }
}

// A redux-thunk function which initiates the asynchronous retrieval of the user's
// prior uploads. It handles when and where the above creators get called
export function fetchUserSamples(usercode) {
  return dispatch => {
    dispatch(fetchUserSamplesRequest())
    var headers = new Headers()
    headers.append('Accept', 'application/json')
    var request = {method: 'GET', headers}
    return fetch(BASE_URL + USER_SAMPLES_ENDPOINT + usercode, request)
      .then(handleErrors)
      .then(response => response.json())
      .then(response => response.igsn_list)
      .then(response => dispatch(fetchUserSamplesSuccess(response)))
      .catch(response => {
        if(response.message === "404")
          dispatch(fetchUserSamplesFailure('You don\'t appear to have uploaded any samples yet.'))
        else
          dispatch(fetchUserSamplesFailure('Network connectivity error. Check your network connection.'))
      })
  }
}
