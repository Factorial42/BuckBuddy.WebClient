import {
  signup as apiSignup,
  signupFb as apiSignupFb,
  signupStripe as apiSignupStripe,
  updatePhoto as apiUpdatePhoto
} from 'client/data/user'
import { browserHistory } from 'react-router'
import { setToken, getToken } from 'client/data/userLocalSession'

export function startEditingCampaign() {
  return dispatch => {
    dispatch({ type: 'START_EDITING_CAMPAIGN' });
  };
}

export function cancelEditingCampaign() {
  return dispatch => {
    dispatch({ type: 'CANCEL_EDITING_CAMPAIGN' });
  };
}

export function saveCampaign() {
  return dispatch => {
    //TODO...save in api..
  }
}
