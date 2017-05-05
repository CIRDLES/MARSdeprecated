import {List, fromJS} from 'immutable'
import toXML from '../helpers/toXML'
import FormData from 'form-data'
import fetch from 'isomorphic-fetch'
import convert from 'xml-to-json-promise'

// Actions
const INITIALIZE_SAMPLES = 'mars/upload/INITIALIZE_SAMPLES'
// actions called by the thunk action creator called upload()
const UPLOAD_REQUEST = 'mars/upload/UPLOAD_REQUEST'
const UPLOAD_SUCCESS = 'mars/upload/UPLOAD_SUCCESS'
const UPLOAD_FAILURE = 'mars/upload/UPLOAD_FAILURE'

// Initial state
const INITIAL_STATE = List([])

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case INITIALIZE_SAMPLES:
      return fromJS(action.sampleArray)
    case UPLOAD_SUCCESS:
      let results = action.results
      for(let i=0; i<results.length; i++) {
        state = state.set(i, state.get(i).push({originalKey: '', originalValue: '', key:'igsn', value:results[i].igsn}))
      }
      return state
    default:
      return state
  }
}

// Action Creators
export function initializeSamples(sampleArray) {
  return {
    type: INITIALIZE_SAMPLES,
    sampleArray
  }
}

export function uploadRequest() {
  return {
    type: UPLOAD_REQUEST
  }
}

// All samples uploaded correctly
export function uploadSuccess(results) {
  return {
    type: UPLOAD_SUCCESS,
    results
  }
}

// Not all samples uploaded correctly
export function uploadFailure(error) {
  return {
    type: UPLOAD_FAILURE,
    error
  }
}

export function upload(username, password, usercode, samples) {
  return dispatch => {
    dispatch(uploadRequest())
    let xmlSample = toXML(samples, usercode)
    let form = new FormData()
    let request = {method: 'POST', body: form}
    form.append('username', username)
    form.append('password', password)
    form.append('content', new XMLSerializer().serializeToString(xmlSample))
    fetch('https://sesardev.geosamples.org/webservices/upload.php', request)
      .then(handleErrors)
      .then(response => response.text())
      .then(responseText => convert.xmlDataToJSON(responseText, {explicitArray: false}))
      .then(responseJson => dispatch(uploadSuccess(responseJson.results.sample)))
  }
}

function handleErrors(response) {
  if (!response.ok) throw Error(response.status)
  return response
}
