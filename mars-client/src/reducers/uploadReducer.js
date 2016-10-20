import {
  UPLOADS_INITIAL_STATE,
  addUploads,
  updateUploads
} from '../core/uploadCore'
import {
  ADD_UPLOADS,
  POST_SAMPLES_REQUEST,
  POST_SAMPLES_SUCCESS,
  POST_SAMPLES_FAILURE
} from '../actionTypes'

export default function uploads(state = UPLOADS_INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_UPLOADS:
      return addUploads(state, action.uploads)
    case POST_SAMPLES_SUCCESS:
      return updateUploads(state, action.results)
    default:
      return state
  }
}
