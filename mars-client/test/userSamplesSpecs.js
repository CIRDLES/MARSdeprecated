import {expect} from 'chai'
import * as actions from '../src/actions/userSamplesActions'
import * as types from '../src/actionTypes'

import * as core from '../src/core/userSamplesCore'
import reducer from '../src/reducers/userSamplesReducer'
import {List} from 'immutable'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as constants from '../src/constants'

describe('Previously uploaded samples', () => {

  describe('User samples action creators', () => {

    it('creates an action to request previously uploaded samples', () => {
      const expectedAction = {
        type: types.FETCH_USER_SAMPLES_REQUEST
      }
      expect(actions.fetchUserSamplesRequest()).to.eql(expectedAction)
    })

    it('creates an action from the successful retrieval of past user samples', () => {
      const samples = ['TIN000001', 'TIN000002', 'TIN000003']
      const expectedAction = {
        type: types.FETCH_USER_SAMPLES_SUCCESS,
        samples
      }
      expect(actions.fetchUserSamplesSuccess(samples)).to.eql(expectedAction)
    })

    it('creates an action for the unsuccessful retrieval of past user samples', () => {
      const error = 'Invalid Request'
      const expectedAction = {
        type: types.FETCH_USER_SAMPLES_FAILURE,
        error
      }
      expect(actions.fetchUserSamplesFailure(error)).to.eql(expectedAction)
    })

  })

  describe('Core state logic', () => {

    it('appends elements to the user\'s list of previously uploaded samples', () => {
      const state = List(['TIN000001'])
      const samples = ['TIN000002', 'TIN000003', 'TIN000004']
      const nextState = core.unionUserSamples(state, samples)
      expect(nextState).to.eql(List(['TIN000001'].concat(samples)))
    })

  })

  describe('Reducer logic', () => {

    it('returns the initial state of the samples list', () => {
      expect(reducer(undefined, {})).to.eql(List([]))
    })

    it('unions elements to the user\'s list of previously uploaded samples', () => {
      const state = List([])
      const action = {type: types.FETCH_USER_SAMPLES_SUCCESS, samples: ['TIN000001','TIN000002','TIN000003']}
      const nextState = reducer(state, action)
      expect(nextState).to.eql(List(['TIN000001','TIN000002','TIN000003']))
    })

  })

  describe('Asynchronous thunk action', () => {

    // Configuration for async tests:
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates FETCH_USER_SAMPLES_SUCCESS when samples are retrieved', () => {
      nock(constants.BASE_URL)
        .get(constants.USER_SAMPLES_ENDPOINT + 'TIN')
        .reply(200, {"igsn_list":["TIN000001","TIN000002","TIN000003"],"total_counts":"3"})

        const expectedActions = [
          {type: types.FETCH_USER_SAMPLES_REQUEST},
          {type: types.FETCH_USER_SAMPLES_SUCCESS,  samples: ["TIN000001", "TIN000002", "TIN000003"]}
        ]
        const store = mockStore({})

        return store.dispatch(actions.fetchUserSamples('TIN'))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('creates FETCH_USER_SAMPLES_FAILURE when the user has no samples', () => {
      nock(constants.BASE_URL)
      .get(constants.USER_SAMPLES_ENDPOINT + 'TIN')
      .reply(404, '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"><html><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p>The requested URL /samples/user_code/TIN was not found on this server.</p></body></html>')

      const expectedActions = [
        {type: types.FETCH_USER_SAMPLES_REQUEST},
        {type: types.FETCH_USER_SAMPLES_FAILURE, error: 'You don\'t appear to have uploaded any samples yet.'}
      ]
      const store = mockStore({})

      return store.dispatch(actions.fetchUserSamples('TIN'))
        .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('creates FETCH_USER_SAMPLES_FAILURE when there is a network error', () => {
      nock(constants.BASE_URL)
        .get(constants.USER_SAMPLES_ENDPOINT + 'TIN')
        .replyWithError('Can\'t complete the request.')

        const error = 'Network connectivity error. Check your network connection.'

        const expectedActions = [
          {type: types.FETCH_USER_SAMPLES_REQUEST},
          {type: types.FETCH_USER_SAMPLES_FAILURE, error}
        ]
        const store = mockStore({})

        return store.dispatch(actions.fetchUserSamples('TIN'))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    // The documentation says that there is a 400 code for an invalid usercode but I have been unable to recreate it

  })

})
