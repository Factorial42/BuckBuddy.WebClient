import {
  signup as apiSignup,
  signupFb as apiSignupFb,
  signupStripe as apiSignupStripe,
  updatePhoto as apiUpdatePhoto
} from 'client/data/user'

import {
  getCampaign as apiGetCampaign,
  getCampaignBySlug as apiGetCampaignBySlug,
  updateCampaign as apiUpdateCampaign,
  addCampaignPhoto as apiAddCampaignPhoto,
  deleteCampaignPhoto as apiDeleteCampaignPhoto
} from 'client/data/campaign'

import { setToken, getToken } from 'client/data/userLocalSession'

export function campaignLoadedSuccess(campaign) {
  return dispatch => {
    dispatch({ campaign, type: 'CAMPAIGN_LOADED_SUCCESS' });
  };
}

export function campaignLoadedFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_LOADED_FAILURE' });
  };
}

export function campaignSavedSuccess(campaign) {
  return dispatch => {
    dispatch({ campaign, type: 'CAMPAIGN_SAVED_SUCCESS' });
  };
}

export function campaignSavedFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_SAVED_FAILURE' });
  };
}

export function campaignAddPhotoSuccess(campaign) {
  return dispatch => {
    dispatch({ campaign, type: 'CAMPAIGN_ADD_PHOTO_SUCCESS' });
  };
}

export function campaignAddPhotoFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_ADD_PHOTO_FAILURE' });
  };
}

export function campaignDeletePhotoSuccess(campaign) {
  return dispatch => {
    dispatch({ campaign, type: 'CAMPAIGN_DELETE_PHOTO_SUCCESS' });
  };
}

export function campaignDeletePhotoFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_DELETE_PHOTO_FAILURE' });
  };
}

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

export function addCampaignPhoto(file) {
  return (dispatch, getState) => {
    let {campaign} = getState()
    let {campaignId} = campaign;

    apiAddCampaignPhoto(getToken(), campaignId, file)
      .then(campaign => dispatch(campaignAddPhotoSuccess(campaign)))
      .catch(error => dispatch(campaignAddPhotoFailure(error)))

  }
}

export function deleteCampaignPhoto(profilePicId) {

  return (dispatch, getState) => {
    let {campaign} = getState()
    let {campaignId} = campaign;

    apiDeleteCampaignPhoto(getToken(), campaignId, profilePicId)
      .then(campaign => dispatch(campaignDeletePhotoSuccess(campaign)))
      .catch(error => dispatch(campaignDeletePhotoFailure(error)))

  }

}

export function saveCampaign(changes) {
  return (dispatch, getState) => {

    let {campaign} = getState()

    let mutatedCampaign = Object.assign({}, campaign, changes);

    apiUpdateCampaign(getToken(), mutatedCampaign)
      .then(campaign => dispatch(campaignSavedSuccess(mutatedCampaign)))
      .catch(error => dispatch(campaignSavedFailure(error)))
  }
}

export function loadCampaign(slug) {
  return dispatch => {

    (slug ? apiGetCampaignBySlug(slug, getToken()) : apiGetCampaign(getToken()))
      .then(campaign => dispatch(campaignLoadedSuccess(campaign)))
      .catch(error => dispatch(campaignLoadedFailure(error)))
  }

}
