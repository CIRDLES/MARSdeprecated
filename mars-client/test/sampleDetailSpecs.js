import {expect} from 'chai'
import * as actions from '../src/actions/sampleDetailActions'
import * as types from '../src/actionTypes'

import * as core from '../src/core/sampleDetailCore'
import reducer from '../src/reducers/sampleDetailReducer'
import {Map} from 'immutable'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as constants from '../src/constants'

describe('Fetch Sample by IGSN', () => {

  describe('Action creators', () => {

    it('creates an action to request a sample', () => {
      const expectedAction = {
        type: types.FETCH_SAMPLE_REQUEST
      }
      expect(actions.fetchSampleRequest()).to.eql(expectedAction)
    })

    it('creates an action for the successful retrieval of a sample', () => {
      const sample = require('./testData/sampleDetails.json')
      const expectedAction = {
        type: types.FETCH_SAMPLE_SUCCESS,
        sample
      }
      expect(actions.fetchSampleSuccess(sample)).to.eql(expectedAction)
    })

    it('creates an action for the unsuccessful retrieval of a sample', () => {
      const error = 'Invalid Request'
      const expectedAction = {
        type: types.FETCH_SAMPLE_FAILURE,
        error
      }
      expect(actions.fetchSampleFailure(error)).to.eql(expectedAction)
    })

  })

  describe('Core state logic', () => {

    it('adds sample details to the sample details object', () => {
      const state = Map({})
      const sample = require('./testData/sampleDetails.json')
      const nextState = core.addSampleDetail(state, sample)
      expect(nextState).to.equal(Map(sample))
    })
  })

  describe('Reducer logic', () => {

    it('returns the initial state of the detail samples object', () => {
      expect(reducer(undefined, {})).to.equal(Map({}))
    })

    it('updates state when the details of a sample are retrieved', () => {
      const state = Map({})
      const sample = require('./testData/sampleDetails.json')
      const action = {type: types.FETCH_SAMPLE_SUCCESS, sample}
      const nextState = reducer(state, action)
      expect(nextState).to.equal(Map(sample))
    })

  })

  describe('Asynchronous thunk action', () => {

    //Configuration for async tests:
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    afterEach(() => {
      nock.cleanAll()
    })

    it ('creates an action for the successful retrieval of a sample by its IGSN', () => {
      const sample = require('./testData/sampleDetails.json')
      nock(constants.BASE_URL)
        .get(constants.FETCH_SAMPLE_ENDPOINT + '?igsn=TIN000001')
        .reply(200, {sample})

      const expectedActions = [
        {type: types.FETCH_SAMPLE_REQUEST},
        {type: types.FETCH_SAMPLE_SUCCESS, sample}
      ]
      const store = mockStore({})

      return store.dispatch(actions.fetchSample('gneiss@gmail.com', 'i<3Rocks', 'TIN000001'))
        .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('creates an action for an invalid request with an invalid IGSN', () => {
      nock(constants.BASE_URL)
        .get(constants.FETCH_SAMPLE_ENDPOINT + '?igsn=TIN01')
        .reply(400, {error: "No IGSN Supplied"})

        const expectedActions = [
          {type: types.FETCH_SAMPLE_REQUEST},
          {type: types.FETCH_SAMPLE_FAILURE, error: 'Bad Request - IGSN is invalid.'}
        ]
        const store = mockStore({})

        return store.dispatch(actions.fetchSample('gneiss@gmail.com', 'i<3Rocks', 'TIN01'))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    // The API does not appear to ever produce this response. Instead it always returns the 400
    it('creates an action for an invalid request with an invalid IGSN', () => {
      nock(constants.BASE_URL)
        .get(constants.FETCH_SAMPLE_ENDPOINT)
        .reply(403, {error: "No IGSN Supplied"})

        const expectedActions = [
          {type: types.FETCH_SAMPLE_REQUEST},
          {type: types.FETCH_SAMPLE_FAILURE, error: 'Forbidden - IGSN has either been deactivated or non public.'}
        ]
        const store = mockStore({})

        return store.dispatch(actions.fetchSample('gneis@gmail.com', 'i<3Rocks'))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('creates an action for the attempted retrieval of a nonexistant sample', () => {
      nock(constants.BASE_URL)
        .get(constants.FETCH_SAMPLE_ENDPOINT + '?igsn=TIN000004')
        .reply(404, {sample: {error: "TIN000004 does not exist in the database"}})

        const expectedActions = [
          {type: types.FETCH_SAMPLE_REQUEST},
          {type: types.FETCH_SAMPLE_FAILURE, error: 'Not Found - IGSN not found.'}
        ]
        const store = mockStore({})

        return store.dispatch(actions.fetchSample('gneis@gmail.com', 'i<3Rocks', 'TIN000004'))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('creates a failure action when there is a network error', () => {
      nock(constants.BASE_URL)
        .get(constants.USER_SAMPLES_ENDPOINT + 'TIN')
        .replyWithError('Can\'t complete the request.')

        const error = 'Network connectivity error. Check your network connection.'

        const expectedActions = [
          {type: types.FETCH_SAMPLE_REQUEST},
          {type: types.FETCH_SAMPLE_FAILURE, error}
        ]
        const store = mockStore({})

        return store.dispatch(actions.fetchSample('TIN'))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })
  })

})
