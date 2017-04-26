import {List, fromJS} from 'immutable'
import toXML from '../helpers/toXML'
import FormData from 'form-data'
import fetch from 'isomorphic-fetch'
import convert from 'xml-to-json-promise'

// Actions
const INITIALIZE_SAMPLES = 'mars/upload/INITIALIZE_SAMPLES'
// actions called by the thunk action creator called upload()
const UPLOAD_ALL_REQUEST = 'mars/upload/UPLOAD_ALL_REQUEST'
const UPLOAD_ALL_SUCCESS = 'mars/upload/UPLOAD_ALL_SUCCESS'
const UPLOAD_ALL_FAILURE = 'mars/upload/UPLOAD_ALL_FAILURE'
const UPLOAD_SAMPLE_REQUEST = 'mars/upload/UPLOAD_SAMPLE_REQUEST'
const UPLOAD_SAMPLE_SUCCESS = 'mars/upload/UPLOAD_SAMPLE_SUCCESS'
const UPLOAD_SAMPLE_FAILURE = 'mars/upload/UPLOAD_SAMPLE_FAILURE'

// Initial state
const INITIAL_STATE = List([])

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case INITIALIZE_SAMPLES:
      return fromJS(action.sampleArray)
    case UPLOAD_SAMPLE_SUCCESS:
      console.log(state.get(action.index))
      return state.set(action.index, state.get(action.index).push({originalKey: '', originalValue: '', key:'igsn', value:action.igsn}))
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

export function uploadAllRequest() {
  return {
    type: UPLOAD_ALL_REQUEST
  }
}

// All samples uploaded correctly
export function uploadAllSuccess() {
  return {
    type: UPLOAD_ALL_SUCCESS,
  }
}

// Not all samples uploaded correctly
export function uploadAllFailure(error) {
  return {
    type: UPLOAD_ALL_FAILURE,
    error
  }
}

export function uploadSampleRequest(index) {
  return {
    type: UPLOAD_SAMPLE_REQUEST,
    index
  }
}

export function uploadSampleSuccess(status, igsn, index) {
  return {
    type: UPLOAD_SAMPLE_SUCCESS,
    igsn,
    index
  }
}

export function uploadSampleFailure(error, index) {
  return {
    type: UPLOAD_SAMPLE_FAILURE,
    error,
    index
  }
}

export function upload(username, password, samples) {
  return dispatch => {
    dispatch(uploadAllRequest())
    let p = []

    // create an upload promise for every sample
    for(let i=0; i<samples.length; i++) {
      dispatch(uploadSampleRequest(i))
      let promise = new Promise((resolve) => resolve(toXML(samples[i])))
        .then(xmlSample => {
          let form = new FormData()
          let request = {method: 'POST', body: form}
          form.append('username', username)
          form.append('password', password)
          form.append('content', new XMLSerializer().serializeToString(xmlSample))
          return fetch('https://sesardev.geosamples.org/webservices/upload.php', request)
        })
        .then(handleErrors)
        .then(response => response.text())
        .then(responseText => convert.xmlDataToJSON(responseText, {explicitArray: false}))
        .then(responseJson => responseJson.results.sample)
        .then(sample => dispatch(uploadSampleSuccess(sample.status, sample.igsn, i)))
        .catch(response => {
          if(response.message === '400') {
            convert.xmlDataToJSON(response.text(), {explicitArray: false})
              .then(response => dispatch(uploadSampleFailure(response.error, i)))
          }
        })
        p.push(promise)
    }

    // create a promise that resolves upon the completion of all the requ
    Promise.all(p)
      .then(responses => {
        dispatch(uploadAllSuccess())
      })
      .catch(responses => {
        dispatch(uploadALLFailure())
      })
  }
}

function handleErrors(response) {
  if (!response.ok) throw Error(response.status)
  return response
}
