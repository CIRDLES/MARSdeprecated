import {expect} from 'chai'
import * as actions from '../src/actions/postSamplesActions'
import * as types from '../src/actionTypes'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as constants from '../src/constants'
import nock from 'nock'

describe('Post Samples', () => {

  describe('Action creators', () => {

    it('create an action to request a sample post', () => {
      const expectedAction = {
        type: types.POST_SAMPLES_REQUEST
      }
      expect(actions.postSamplesRequest()).to.eql(expectedAction)
    })

    it('create an action for a successful sample post', () => {
      const results = [{
        status: 'Sample [NewSample1] was saved successfully with IGSN [TIN000004]',
        name: 'NewSample1',
        igsn: 'TIN000004'
      },{
        status: 'Sample [NewSample2] was saved successfully with IGSN [TIN000005]',
        name: 'NewSample2',
        igsn: 'TIN000005'
      }]
      const expectedAction = {
        type: types.POST_SAMPLES_SUCCESS,
        results
      }
      expect(actions.postSamplesSuccess(results)).to.eql(expectedAction)
    })

    it('create an action for the unsuccessful retrieval of past user samples', () => {
      const error = 'Invalid Request'
      const expectedAction = {
        type: types.POST_SAMPLES_FAILURE,
        error
      }
      expect(actions.postSamplesFailure(error)).to.eql(expectedAction)
    })
  })

  describe('Asynchronous thunk action', () => {

    //Configuration for async tests:
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    afterEach(() => {
      nock.cleanAll()
    })

    it('create POST_SAMPLES_SUCCESS when samples are successfully posted', () => {
      const xmlSamples = '<samples xmlns="http://app.geosamples.org" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://app.geosamples.org/samplev2.xsd"><sample><user_code>TIN</user_code><sample_type>Individual Sample</sample_type><name>RockBottom</name><material>Rock</material></sample></samples>'
      const results = [{
        status: 'Sample [RockBottom] was saved successfully with IGSN [TIN000006].',
        name: 'RockBottom',
        igsn: 'TIN000006'
      }]
      const responseString = '<results><sample><status>Sample [RockBottom] was saved successfully with IGSN [TIN000006].</status><name>RockBottom</name><igsn>TIN000006</igsn></sample></results>'
      nock(constants.BASE_URL)
        .post(constants.POST_SAMPLES_ENDPOINT)
        .reply(200, responseString)

      const expectedActions = [
        {type: types.POST_SAMPLES_REQUEST},
        {type: types.POST_SAMPLES_SUCCESS, results}
      ]
      const store = mockStore({})

      return store.dispatch(actions.postSamples('gneiss@gmail.com', 'i<3Rocks', xmlSamples))
        .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('create POST_SAMPLES_FAILURE when samples are unsuccessfully posted', () => {
      const xmlSamples = '<samples xmlns="http://app.geosamples.org" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://app.geosamples.org/samplev2.xsd"><sample><user_code>TIN</user_code><sample_type>Individual Sample</sample_type><name>RockBottom</name><material>Rock</material></sample></samples>'
      const responseString = '<results><valid>no</valid><error code="InvalidXML">Failed to parse QName \'xmlns:\'</error><error code="InvalidXML">Specification mandate value for attribute xmlns: </error><error code="InvalidXML">attributes construct error</error><error code="InvalidXML">Couldn\'t find end of Start Tag samples line 1</error><error code="InvalidXML">Extra content at the end of the document</error></results>'
      const results = 'Something went wrong'
      nock(constants.BASE_URL)
        .post(constants.POST_SAMPLES_ENDPOINT)
        .reply(400, responseString)

      const expectedActions = [
        {type: types.POST_SAMPLES_REQUEST},
        {type: types.POST_SAMPLES_FAILURE, error: results}
      ]
      const store = mockStore({})

      return store.dispatch(actions.postSamples('gneiss@gmail.com', 'i<3Rocks', xmlSamples))
        .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('create POST_SAMPLES_FAILURE when the user is not authorized', () => {
      const xmlSamples = '<samples xmlns="http://app.geosamples.org" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://app.geosamples.org/samplev2.xsd"><sample><user_code>TIN</user_code><sample_type>Individual Sample</sample_type><name>RockBottom</name><material>Rock</material></sample></samples>'
      const responseString = '<results><valid>no</valid><error code="InvalidAuth">Invalid login, username not known or password not matched</error></results>'
      const results = 'You are not authorized to upload'
      nock(constants.BASE_URL)
        .post(constants.POST_SAMPLES_ENDPOINT)
        .reply(401, responseString)

      const expectedActions = [
        {type: types.POST_SAMPLES_REQUEST},
        {type: types.POST_SAMPLES_FAILURE, error: results}
      ]
      const store = mockStore({})

      return store.dispatch(actions.postSamples('gneiss@gmail.com', 'i<3Rocks', xmlSamples))
        .then(() => expect(store.getActions()).to.eql(expectedActions))
    })

    it('create POST_SAMPLES_FAILURE whn the network is unavailable', () => {
      const xmlSamples = '<samples xmlns="http://app.geosamples.org" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://app.geosamples.org/samplev2.xsd"><sample><user_code>TIN</user_code><sample_type>Individual Sample</sample_type><name>RockBottom</name><material>Rock</material></sample></samples>'
        nock(constants.BASE_URL)
          .post(constants.POST_SAMPLES_ENDPOINT)
          .replyWithError('Can\'t complete the request.')
        const error = 'Network connectivity error. Check your network connection.'

        const expectedActions = [
          {type: types.POST_SAMPLES_REQUEST},
          {type: types.POST_SAMPLES_FAILURE, error}
        ]
        const store = mockStore({})

        return store.dispatch(actions.postSamples('gneiss@gmail.com', 'i<3Rocks', xmlSamples))
          .then(() => expect(store.getActions()).to.eql(expectedActions))
    })
  })
})
