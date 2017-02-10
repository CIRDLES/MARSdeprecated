// this module contains state for maintaining the user in the state

import {Map} from 'immutable'
import FormData from 'form-data'
import fetch from 'isomorphic-fetch'
import convert from 'xml-to-json-promise'

// Actions
const TOGGLE_PERSIST = 'mars/user/TOGGLE_PERSIST'
const CHANGE_USERNAME = 'mars/user/CHANGE_USERNAME'
const CHANGE_PASSWORD = 'mars/user/CHANGE_PASSWORD'
// actions called by the thunk action creator called login()
const LOGIN_REQUEST = 'mars/user/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'mars/user/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'mars/user/LOGIN_FAILURE'

// Initial state
const INITIAL_STATE = Map({
  username: '',
  password: '',
  isPersisted: false
})

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case TOGGLE_PERSIST:
      return state.set('isPersisted', !(state.get('isPersisted')))
    case CHANGE_USERNAME:
      return state.set('username', action.username)
    case CHANGE_PASSWORD:
      return state.set('password', action.password)
    case LOGIN_REQUEST:
      return state.setIn(['ui', 'loading'], true)
    case LOGIN_SUCCESS:
      return state.set('usercode', action.usercode).deleteIn(['ui', 'loading']).deleteIn(['ui', 'error'])
    case LOGIN_FAILURE:
      return state.setIn(['ui', 'error'], action.error).deleteIn(['ui', 'loading'])
    default:
      return state
  }
}

// Action Creators
export function togglePersist() {
  return {
    type: TOGGLE_PERSIST
  }
}

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username
  }
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess(usercode) {
  return {
    type: LOGIN_SUCCESS,
    usercode
  }
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  }
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(loginRequest())
    var form = new FormData()
    form.append('username', username)
    form.append('password', password)
    var request = {method: 'POST', body: form}
    return fetch('https://sesardev.geosamples.org/webservices/credentials_service_v2.php', request)
      .then(handleErrors)
      .then(response => response.text())
      .then(responseText => convert.xmlDataToJSON(responseText, {explicitArray: false}))
      .then(responseJson => responseJson.results.user_codes.user_code)
      .then(usercode => {
        dispatch(loginSuccess(usercode))
        return usercode // return promise so that the submit handler knows to change routes on success
      })
      .catch(response => {
        if(response.message === '401')
          dispatch(loginFailure('Your username and password do not match a GeoPass account.'))
        else
          dispatch(loginFailure('Network connectivity error. Check your network connection.'))
      })
  }
}

function handleErrors(response) {
  if (!response.ok) throw Error(response.status)
  return response
}
