import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  FETCH_USERCODE_SUCCESS,
  FETCH_USERCODE_FAILURE
} from '../actionTypes'
import {
  INITIAL_STATE,
  changeUsername,
  changePassword,
  setUsercode,
  setError
} from '../core/userCore'

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return changeUsername(state, action.username)
    case CHANGE_PASSWORD:
      return changePassword(state, action.password)
    case FETCH_USERCODE_SUCCESS:
      return setUsercode(state, action.usercode)
    case FETCH_USERCODE_FAILURE:
      return setError(state, action.error)
    default:
      return state
  }
}
