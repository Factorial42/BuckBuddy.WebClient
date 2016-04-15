import {
  signup as apiSignup,
  signupFb as apiSignupFb,
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
    dispatch({ error, type: 'SIGNUP_FAILED' });
  };
}

export function setPhotoError(error) {
  return dispatch => {
    dispatch({ error, type: 'SIGNUP_PHOTO_FAILED' });
  };
}

/*
 * Should add the route like parameter in this method
*/
export function signupSuccess(user) {
  return dispatch => {

    let token = user.token;
    setToken(token);

    browserHistory.push('/profile/photo/edit')

    dispatch({user, type: 'SIGNUP_SUCCESS' });

  };
}

export function signup(userData) {
  return dispatch =>
    apiSignup(userData)
    .then(user => {
      dispatch(signupSuccess(user));
    })
    .catch(error => { dispatch(signupError(error)) });
}


export function signupFb(userData) {

  return dispatch => {
    apiSignupFb(userData)
    .then(user => {
      dispatch(signupSuccess(user));
    })
    .catch(error => { dispatch(signupError(error)) });

  }

}

export function setPhoto(userId, file) {

  return dispatch => {
    apiUpdatePhoto(userId, getToken(), file)
      .then(() => browserHistory.push('/signup/stripe'))
      .catch(error => { dispatch(setPhotoError(error)) });
  }

}
