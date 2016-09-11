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
  })
})
