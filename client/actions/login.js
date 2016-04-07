import {login as apiLogin} from 'client/data/user'

export function loginError(error) {
  return dispatch => {
    dispatch({ error, type: 'LOGGED_FAILED' });
  };
}

/*
 * Should add the route like parameter in this method
*/
export function loginSuccess(response) {
  return dispatch => {
    console.log('Login yay!')
    dispatch({ response, type: 'LOGGED_SUCCESSFULLY' });
    // router.transitionTo('/dashboard'); // will fire CHANGE_ROUTE in its change handler
  };
}

export function login(credentials) {
  return dispatch =>
    apiLogin(credentials)
    .then(user => {
      dispatch(loginSuccess(user));
    })
    .catch(error => { dispatch(loginError(error)) });
}
