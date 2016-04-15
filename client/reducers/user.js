import { hasSession } from 'client/data/userLocalSession'
import {fromJS} from 'immutable'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return action.user;
    case 'LOGGED_OUT_SUCCESSFULLY':
      return false;
    case 'LOGGED_SUCCESSFULLY':
      return action.user;
    case 'LOGGED_FAILED':
      return false;
    default:
      return state
  }
}

export default reducer
