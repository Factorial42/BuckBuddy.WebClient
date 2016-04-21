import {fromJS} from 'immutable'

const reducer = (state = null, action) => {

  if ([
    'CAMPAIGN_DELETE_PHOTO_SUCCESS',
    'CAMPAIGN_ADD_PHOTO_SUCCESS',
    'CAMPAIGN_CREATE_SUCCESS',
    'CAMPAIGN_LOADED_SUCCESS',
    'CAMPAIGN_SAVED_SUCCESS'].indexOf(action.type) >= 0) {
    return action.campaign;
  }

  return state;
}

export default reducer
