// User form actions (local changes)
export const CHANGE_USERNAME = 'CHANGE_USERNAME'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

// Async fetch usercode called by thunk fetchUsercode(username, password)
export const FETCH_USERCODE_REQUEST = 'FETCH_USERCODE_REQUEST'
export const FETCH_USERCODE_SUCCESS = 'FETCH_USERCODE_SUCCESS'
export const FETCH_USERCODE_FAILURE = 'FETCH_USERCODE_FAILURE'

// Async fetch user's uploads called by thunk fetchUserSamples(username, password, data, page)
export const FETCH_USER_SAMPLES_REQUEST = 'FETCH_USER_SAMPLES_REQUEST'
export const FETCH_USER_SAMPLES_SUCCESS = 'FETCH_USER_SAMPLES_SUCCESS'
export const FETCH_USER_SAMPLES_FAILURE = 'FETCH_USER_SAMPLES_FAILURE'
