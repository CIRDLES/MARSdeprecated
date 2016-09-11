import {List} from 'immutable'

export const USER_SAMPLES_INITIAL_STATE = new List([]) // perhaps should be an orderedSet?

// unions user sample igsns
export function unionUserSamples(state, samples) {
  return state.toSet().union(List(samples).toSet()).toList()  // this may not be the most performant solution
}
