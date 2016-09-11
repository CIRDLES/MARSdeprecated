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

})
