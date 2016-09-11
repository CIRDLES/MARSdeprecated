import {
  USER_SAMPLES_INITIAL_STATE,
  unionUserSamples
} from '../core/userSamplesCore'
import {
  FETCH_USER_SAMPLES_SUCCESS
} from '../actionTypes'

export default function userSamples(state = USER_SAMPLES_INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER_SAMPLES_SUCCESS:
      return unionUserSamples(state, action.samples)
    default:
      return state
  }
}
