import {
  signup as apiSignup,
  signupFb as apiSignupFb,
  signupStripe as apiSignupStripe,
  updatePhoto as apiUpdatePhoto
} from 'client/data/user'
import { browserHistory } from 'react-router'
import { setToken, getToken } from 'client/data/userLocalSession'

export function setCampaignGoal(target, reason) {
  return dispatch => {
    dispatch({ target, reason, type: 'SET_CAMPAIGN_GOAL' });
    browserHistory.push("/login/options")
  };
}

export function signupError(error) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({ error, type: 'SIGNUP_FAILED' });
  };
}

export function setPhotoError(error) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({ error, type: 'SIGNUP_PHOTO_FAILED' });
  };
}

export function setPhotoSuccess(profilePic) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({profilePic, type: 'SIGNUP_PHOTO_SUCCESS' });
  };
}

export function setStripeConnectionError(error) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({ error, type: 'SIGNUP_STRIPE_FAILED' });
  };
}
/*
 * Should add the route like parameter in this method
*/
export function signupSuccess(user) {
  return dispatch => {

    let token = user.token;
    setToken(token);

    browserHistory.push('/signup/photo')

    dispatch({user, type: 'SIGNUP_SUCCESS' });
    dispatch({type: 'LOADING_STOPPED' });

  };
}

export function signup(userData) {
  return dispatch => {

    dispatch({type: 'LOADING_STARTED' });

    return apiSignup(userData)
    .then(user => {
      dispatch(signupSuccess(user));
    })
    .catch(error => { dispatch(signupError(error)) });
  }

}


export function signupFb(userData) {

  return dispatch => {
    dispatch({type: 'LOADING_STARTED' });
    apiSignupFb(userData)
    .then(user => {
      dispatch(signupSuccess(user));
    })
    .catch(error => { dispatch(signupError(error)) });

  }

}

export function setPhoto(userId, file) {

  return dispatch => {
    dispatch({type: 'LOADING_STARTED' });
    apiUpdatePhoto(userId, getToken(), file)
      .then((res) => {
        //TODO: dispatch the new photo URL ...
        dispatch(setPhotoSuccess(res.profilePic));
      })
      .catch(error => { dispatch(setPhotoError(error)) });
  }

}

export function setStripeConnection(userId, code) {

  return dispatch => {
    dispatch({type: 'LOADING_STARTED' });
    apiSignupStripe(userId, getToken(), code)
      .then((res) => {
        browserHistory.push("/campaign")
        dispatch({type: 'LOADING_STOPPED' });
      })
      .catch(error => { dispatch(setStripeConnectionError(error)) });
  }

}
