import {fromJS} from 'immutable'

const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGGED_SUCCESSFULLY':
      console.log(action)
      return state;
    case 'LOGGED_FAILED':
      console.log(action)
      return state;
    default:
      return state
  }
}

export default login
