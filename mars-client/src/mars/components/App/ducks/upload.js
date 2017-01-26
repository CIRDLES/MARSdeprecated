import {Map} from 'immutable'

// Actions
const CHANGE_MAPPING_SOURCE = 'mars/upload/CHANGE_SOURCE_MAPPING'
const CHANGE_SOURCE_FORMAT = 'mars/upload/CHANGE_SOURCE_FORMAT'
const CHANGE_SOURCE_FILES = 'mars/upload/CHANGE_SOURCE_FILES'
const SET_MAPPED_SAMPLES = 'mars/upload/SET_MAPPED_SAMPLES'

// Initial state
const INITIAL_STATE = Map({})

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CHANGE_MAPPING_SOURCE:
      return state.setIn(['settings', 'sourceMap'], action.sourceMap)
    case CHANGE_SOURCE_FORMAT:
      return state.setIn(['settings', 'sourceFormat'], action.sourceFormat)
    case CHANGE_SOURCE_FILES:
      return state.setIn(['settings', 'sourceFiles'], action.sourceFiles)
    case SET_MAPPED_SAMPLES:
      return state.set('samples', action.samples)
    default:
      return state
  }
}

// Action Creators
export function changeMappingSource(sourceMap) {
  return {
    type: CHANGE_MAPPING_SOURCE,
    sourceMap
  }
}

export function changeSourceFormat(sourceFormat) {
  return {
    type: CHANGE_SOURCE_FORMAT,
    sourceFormat
  }
}

export function changeSourceFiles(sourceFiles) {
  return {
    type: CHANGE_SOURCE_FILES,
    sourceFiles
  }
}

export function setMappedSamples(samples) {
  return {
    type: SET_MAPPED_SAMPLES,
    samples
  }
}
