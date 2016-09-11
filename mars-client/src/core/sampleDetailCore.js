import {Map} from 'immutable'

export const SAMPLE_DETAIL_INITIAL_STATE = Map({})

export function addSampleDetail(state, sample) {
  return Map(sample)// we could add multiple samples by igsn like state.set(sample.igsn, sample)
}
