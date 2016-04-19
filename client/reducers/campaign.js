import {fromJS} from 'immutable'

const reducer = (state = null, action) => {

  if ([
    'CAMPAIGN_ADD_PHOTO_SUCCESS',
    'CAMPAIGN_CREATE_SUCCESS',
    'CAMPAIGN_LOADED_SUCCESS',
    'CAMPAIGN_SAVED_SUCCESS'].indexOf(action.type) >= 0) {
    return action.campaign;
  }

  return state;
  // switch (action.type) {
  //   case 'CAMPAIGN_CREATE_SUCCESS':
  //     return action.campaign;
  //   case 'CAMPAIGN_LOADED_SUCCESS':
  //     return action.campaign;
  //   default:
  //     return state
  // }
}

export default reducer
