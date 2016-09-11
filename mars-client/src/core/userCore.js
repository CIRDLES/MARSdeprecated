import {Map} from 'immutable'

export const INITIAL_STATE = Map({
  username: '',
  password: ''
})

export function changeUsername(state, username) {
  return state.set('username', username)
}

export function changePassword(state, password) {
  return state.set('password', password)
}

export function setUsercode(state, usercode) {
  return state.set('usercode', usercode).delete('error')
}

export function setError(state, error) {
  return state.set('error', error)
}
