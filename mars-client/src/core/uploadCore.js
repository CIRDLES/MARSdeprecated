import {List} from 'immutable'

export const UPLOADS_INITIAL_STATE = List([])

export function addUploads(state, uploads) {
  return List(uploads)
}

export function updateUploads(state, results) {
  for(let i=0; i<results.length; i++) {
    let sample = state.get(i)
    sample = Object.assign({}, sample, results[i])
    state = state.set(i, sample)
  }
  return state
}
