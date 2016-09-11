import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  FETCH_USERCODE_REQUEST,
  FETCH_USERCODE_SUCCESS,
  FETCH_USERCODE_FAILURE
} from '../actionTypes'
import {
  BASE_URL,
  USER_VERIFICATION_ENDPOINT
} from '../constants'
import handleErrors from '../fetchErrorHandler'
import FormData from 'form-data'
import fetch from 'isomorphic-fetch'
import convert from 'xml-to-json-promise'


// Creates an action for locally changing the user's username
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username
  }
}

// Creates an action for locally changing the user's password
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password
  }
}

// Creates an action that signals the beginning of the asynchronous call
// that verifies the user's credentials
export function fetchUsercodeRequest() {
  return {
    type: FETCH_USERCODE_REQUEST
  }
}

// Creates an action upon the successful completion of the asynchronous call
// that verifies the user's credentials.
export function fetchUsercodeSuccess(usercode) {
  return {
    type: FETCH_USERCODE_SUCCESS,
    usercode
  }
}

// Creates an action upon the unsuccessful completion of the asynchronous call
// that verifies the user's credentials
export function fetchUsercodeFailure(error) {
  return {
    type: FETCH_USERCODE_FAILURE,
    error
  }
}

// A redux-thunk function that makes an asynchronous call to verify the user's
// credentials. It determines when to fire the above action creators
export function fetchUsercode(username, password) {
  return dispatch => {
    dispatch(fetchUsercodeRequest())
    var form = new FormData()
    form.append('username', username)
    form.append('password', password)
    var request = {method: 'POST', body: form}
    return fetch(BASE_URL + USER_VERIFICATION_ENDPOINT, request)
      .then(handleErrors)
      .then(response => response.text())
      .then(responseText => convert.xmlDataToJSON(responseText,{explicitArray: false}))
      .then(responseJson => responseJson.results.user_codes.user_code)
      .then(responseText => {
          dispatch(fetchUsercodeSuccess(responseText))
          return responseText
      })
      .catch(response => {
        if(response.message === '401')
          dispatch(fetchUsercodeFailure('Your username and password do not match a GeoPass account.'))
        else
          dispatch(fetchUsercodeFailure('Network connectivity error. Check your network connection.'))
      })
  }
}
