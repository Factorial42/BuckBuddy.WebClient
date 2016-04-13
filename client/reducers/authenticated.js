import { hasSession } from 'client/data/userLocalSession'
import {fromJS} from 'immutable'

const login = (state = hasSession(), action) => {
  switch (action.type) {
    case 'LOGGED_OUT_SUCCESSFULLY': 
      return false;
    case 'LOGGED_SUCCESSFULLY':
      return true;
    case 'LOGGED_FAILED':
      return false;
    default:
      return state
  }
}

export default login