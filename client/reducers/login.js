import {fromJS} from 'immutable'

const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(action)
    default:
      return state
  }
}

export default login
