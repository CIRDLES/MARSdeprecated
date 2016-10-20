import {
  ADD_UPLOADS,
  POST_SAMPLES_REQUEST,
  POST_SAMPLES_SUCCESS,
  POST_SAMPLES_FAILURE
} from '../actionTypes'

import fetch from 'isomorphic-fetch'
import convert from 'xml-to-json-promise'
import {BASE_URL, POST_SAMPLES_ENDPOINT} from '../constants'
import FormData from 'form-data'
import handleErrors from '../fetchErrorHandler'
import xml2js from 'xml2js'

// Creates an action to locally add sample uploads
export function addUploads(uploads) {
  return {
    type: ADD_UPLOADS,
    uploads
  }
}

// Creates an action that signals the beginning of an asynchronous call to
// post samples to the server
export function postSamplesRequest() {
  return {
    type: POST_SAMPLES_REQUEST
  }
}

// Creates an action that signals the successful completion of an asynchronous
// call to post samples to the server
export function postSamplesSuccess(results) {
  return {
    type: POST_SAMPLES_SUCCESS,
    results
  }
}

// Creates an action that signals the unsuccessful completaion of an
// asynchronous call to the server
export function postSamplesFailure(error) {
  return {
    type: POST_SAMPLES_FAILURE,
    error
  }
}

// A redux-thunk function which initiates the asynchronous posting of samples
// to the server. It handles when and where the above action creators get called
export function postSamples(username, password, content) {
  return dispatch => {
    let builder = new xml2js.Builder({rootName: "samples"})
    content = {
      sample: content,
      $: {
        "xmlns": "http://app.geosamples.org",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation": "http://app.geosamples.org/samplev2.xsd"
      }
    }
    content = builder.buildObject(content)
    var form = new FormData()
    var headers = new Headers()
    headers.append('Accept', 'application/xml')
    form.append('username', username)
    form.append('password', password)
    form.append('content', content)
    dispatch(postSamplesRequest())
    return fetch(BASE_URL + POST_SAMPLES_ENDPOINT,{
      method: 'POST',
      body: form
    }).then(handleErrors)
    .then(response => response.text())
    .then(response => convert.xmlDataToJSON(response,{explicitArray: false}))
    .then(response => [].concat(response.results.sample))  // <- force an array
    .then(response => dispatch(postSamplesSuccess(response)))
    .catch(response => {
      if(response.message === "400")
        // Sesar API does not specify which sample contains the error
        // consider posting each sample individually
        // TODO: return the error code and message rather than static string
        dispatch(postSamplesFailure('Something went wrong'))
      else if (response.message === "401")
        dispatch(postSamplesFailure('You are not authorized to upload'))
      else {
        dispatch(postSamplesFailure('Network connectivity error. Check your network connection.'))
      }
    })
  }
}
