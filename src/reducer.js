import { Map, fromJS } from 'immutable'
import { SET_STATE, VOTE } from './constants'

const initialState = Map()

function resetState (state) {
  const currentPair = state.getIn(['vote', 'pair'])
  const hasVoted = state.get('hasVoted')

  if (currentPair && currentPair.includes(hasVoted)) {
    return state
  } else {
    return state.remove('hasVoted')
  }
}

function setState (oldState, newState) {
  return resetState(oldState.merge(newState))
}

function vote (state, entry) {
  if (state.getIn(['vote', 'pair']).includes(entry)) {
    return state.set('hasVoted', entry)
  } else {
    return state
  }

}

export default function reducer (state = initialState , action) {
  switch (action.type) {
    case SET_STATE:
      return setState(state, fromJS(action.state))

    case VOTE:
      return vote(state, action.entry)
    default:
      return state
  }
}
