import fetch from 'isomorphic-fetch'
import {
  FETCH_SAMPLE_REQUEST,
  FETCH_SAMPLE_SUCCESS,
  FETCH_SAMPLE_FAILURE
} from '../actionTypes'

// Creates an action which signals the beginning of an asynchronous call to the
// server for a specific sample
export function fetchSampleRequest() {
  return {
    type: FETCH_SAMPLE_REQUEST
  }
}
