import { getToken } from 'client/data/userLocalSession'
import {
  updatePhoto as apiUpdatePhoto
} from 'client/data/user'

import { browserHistory } from 'react-router'

export function setPhotoError(error) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({ error, type: 'EDIT_PHOTO_FAILED' });
  };
}

export function setPhotoSuccess(profilePic) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({profilePic, type: 'EDIT_PHOTO_SUCCESS' });
  };
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
