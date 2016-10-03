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

// Async fetch sample by IGSN called by thunk fetchSample(username, password, data)
export const FETCH_SAMPLE_REQUEST = 'FETCH_SAMPLE_REQUEST'
export const FETCH_SAMPLE_SUCCESS = 'FETCH_SAMPLE_SUCCESS'
export const FETCH_SAMPLE_FAILURE = 'FETCH_SAMPLE_FAILURE'

// Async sample posting actions called by thunk postSamples(username, password, data)
export const POST_SAMPLES_REQUEST = 'POST_SAMPLES_REQUEST'
export const POST_SAMPLES_SUCCESS = 'POST_SAMPLES_SUCCESS'
export const POST_SAMPLES_FAILURE = 'POST_SAMPLES_FAILURE'
