import {signup as apiSignup} from 'client/data/user'

export function signupError(error) {
  return dispatch => {
    dispatch({ error, type: 'SIGNUP_FAILED' });
  };
}

/*
 * Should add the route like parameter in this method
*/
export function signupSuccess(response) {
  return dispatch => {
    dispatch({ response, type: 'SIGNUP_SUCCESS' });
    // router.transitionTo('/dashboard'); // will fire CHANGE_ROUTE in its change handler
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
