import {expect} from 'chai'
import * as actions from '../src/actions/userActions'
import * as types from '../src/actionTypes'

import * as core from '../src/core/userCore'
import reducer from '../src/reducers/userReducer'
import {Map} from 'immutable'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as constants from '../src/constants'
import nock from 'nock'

describe('User verification', () => {

  describe('User action creators', () => {

    it('creates an action to verify user and retrieve usercode', () => {
      const expectedAction = {
        type: types.FETCH_USERCODE_REQUEST
      }
      expect(actions.fetchUsercodeRequest()).to.eql(expectedAction)
    })

    it('creates an action when a user is successfully verified', () => {
      const usercode = 'TIN'
      const expectedAction = {
        type: types.FETCH_USERCODE_SUCCESS,
        usercode
      }
      expect(actions.fetchUsercodeSuccess(usercode)).to.eql(expectedAction)
    })

    it('creates an action when user verification fails', () => {
      const error = 'Your username and password do not match a GeoPass account.'
      const expectedAction = {
        type: types.FETCH_USERCODE_FAILURE,
        error
      }
      expect(actions.fetchUsercodeFailure(error)).to.eql(expectedAction)
    })

    it('creates an action for local changes to the username', () => {
      const username = 'gneiss@gmail.com'
      const expectedAction = {
        type: types.CHANGE_USERNAME,
        username
      }
      expect(actions.changeUsername(username)).to.eql(expectedAction)
    })

    it('creates an action for local changes to the password', () => {
      const password = 'i<3Rocks'
      const expectedAction = {
        type: types.CHANGE_PASSWORD,
        password
      }
    })

  })

  describe('Core state logic', () => {

    it('changes the username', () => {
      const state = Map({username: '', password: ''})
      const username = 'gneiss@gmail.com'
      const nextState = core.changeUsername(state, username)
      expect(nextState).to.equal(Map({username: 'gneiss@gmail.com', password: ''}))
    })

    it('changes the password', () => {
      const state = Map({username: '', password: ''})
      const password = 'i<3Rocks'
      const nextState = core.changePassword(state, password)
      expect(nextState).to.equal(Map({username: '', password: 'i<3Rocks'}))
    })

    it('sets the user code', () => {
      const state = Map({username: 'gneiss@gmail.com', password: 'i<3Rocks'})
      const usercode = 'TIN'
      const nextState = core.setUsercode(state, usercode)
      expect(nextState).to.equal(Map({username: 'gneiss@gmail.com', password: 'i<3Rocks', usercode: 'TIN'}))
    })

    it('sets an error', () => {
      const state = Map({username: 'gneiss@gmail.com', password: 'i<#Rocks'})
      const error = 'Your username and password do not match a GeoPass account.'
      const nextState = core.setError(state, error)
      expect(nextState).to.equal(Map({username: 'gneiss@gmail.com', password: 'i<#Rocks', error: 'Your username and password do not match a GeoPass account.'}))
    })

  })

  describe('Reducer Logic', () => {

    it('returns the initial state of the user', () => {
      const state = Map({username: '', password: ''})
      expect(reducer(undefined, {})).to.equal(state)
    })

    it('updates the state when the username is changed', () => {
      const state = Map({username: 'gneiss@gmail.com', password: ''})
      const action = {type: types.CHANGE_USERNAME, username: 'onyx@gmail.com'}
      const nextState = reducer(state, action)
      expect(nextState).to.equal(Map({username: 'onyx@gmail.com', password: ''}))
    })

    it('updates the state when the password is changed', () => {
      const state = Map({username: '', password: ''})
      const action = {type: types.CHANGE_PASSWORD, password: 'i<3Rocks'}
      const nextState = reducer(state, action)
      expect(nextState).to.equal(Map({username: '', password: 'i<3Rocks'}))
    })

    it('updates the state when the usercode is changed', () => {
      const state = Map({username: 'gneiss@gmail.com', password: 'i<3Rocks'})
      const action = {type: types.FETCH_USERCODE_SUCCESS, usercode: 'TIN'}
      const nextState = reducer(state, action)
      expect(nextState).to.equal(Map({username: 'gneiss@gmail.com', password: 'i<3Rocks', usercode: 'TIN'}))
    })

    it('updates the state when there is a verification error', () => {
      const state = Map({username: 'gneiss@gmail.com', password: 'i<#Rocks'})
      const action = {type: types.FETCH_USERCODE_FAILURE, error: 'Your username and password do not match a GeoPass account.'}
      const nextState = reducer(state, action)
      expect(nextState).to.equal(Map({username: 'gneiss@gmail.com', password: 'i<#Rocks', error: 'Your username and password do not match a GeoPass account.'}))
    })
  })

  describe('Asynchronous thunk action', () => {

    //Configuration for async tests:
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates FETCH_USERCODE_SUCCESS when user has been verified', () => {
      nock(constants.BASE_URL)
        .post(constants.USER_VERIFICATION_ENDPOINT)
        .reply(200, '<results><valid>yes</valid><user_codes><user_code>TIN</user_code></user_codes></results>')

        const expectedActions = [
          {type: types.FETCH_USERCODE_REQUEST},
          {type: types.FETCH_USERCODE_SUCCESS, usercode: 'TIN'}
        ]
        const store = mockStore({})

        return store.dispatch(actions.fetchUsercode('gneiss@gmail.com', 'i<3Rocks'))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('creates FETCH_USERCODE_FAILURE when there is authentication failure', () => {
      nock(constants.BASE_URL)
        .post(constants.USER_VERIFICATION_ENDPOINT)
        .reply(401, '<results><valid>no</valid><error>Invalid login, username not known or password not matched</error></results>')

        const error = 'Your username and password do not match a GeoPass account.'

        const expectedActions = [
          {type: types.FETCH_USERCODE_REQUEST},
          {type: types.FETCH_USERCODE_FAILURE, error}
        ]
        const store = mockStore({})

        return store.dispatch(actions.fetchUsercode('gneiss@gmail.com', 'i<3 Rocks'))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('creates FETCH_USERCODE_FAILURE when there is a network error', () => {
      nock(constants.BASE_URL)
        .post(constants.USER_VERIFICATION_ENDPOINT)
        .replyWithError('Can\'t complete the request')

        const error = 'Network connectivity error. Check your network connection.'

        const expectedActions = [
          {type: types.FETCH_USERCODE_REQUEST},
          {type: types.FETCH_USERCODE_FAILURE, error}
        ]
        const store = mockStore({})

        return store.dispatch(actions.fetchUsercode('gneiss@gmail.com', 'i<3Rocks'))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

  })

})
