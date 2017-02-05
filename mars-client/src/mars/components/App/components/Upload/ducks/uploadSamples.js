import {List, fromJS} from 'immutable'

// Actions
const INITIALIZE_SAMPLES = 'mars/upload/INITIALIZE_SAMPLES'

// Initial state
const INITIAL_STATE = List([])

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case INITIALIZE_SAMPLES:
      return fromJS(action.sampleArray)
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
