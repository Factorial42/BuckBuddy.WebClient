import {fromJS} from 'immutable'

const test = (state = {}, action) => {
  switch (action.type) {
    case 'SOME_ACTION':
    default:
      return state
  }
}

export default test
