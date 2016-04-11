import {login as apiLogin} from 'client/data/user'
import {resolveFBHandle} from 'client/lib/fb'
import LocalStorageKeys from 'client/constants/LocalStorageKeys'
import { Router} from 'react-router'

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
    dispatch({ response, type: 'LOGGED_SUCCESSFULLY' });
    Router.transitionTo('/campaign'); // will fire CHANGE_ROUTE in its change handler
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

/**
 * FB Login Check
 *
 * @return Function
 */
export function fbLoginCheck() {

  return dispatch =>
    {
      return resolveFBHandle()
        .then($fb => {
          return new Promise((ful, rej) => {
            $fb.getLoginStatus((response) => {
              ful(response)
            });
          })
        })
        .then(response => {

          console.log(response);
          if (response.status === 'connected') {
            // Logged into your app and Facebook.
            //TODO: use an action, or a redux-router call or something, not window.location.href
            //window.location.href = "/campaign";
            Router.transitionTo('/campaign');
          }
        })
    }

}

/**
 * FB login
 *
 * @return Function
 */
export function fbLogin() {

  return dispatch => {
    return resolveFBHandle()
      .then($fb => {
        $fb.login(function(response) {
          console.log(response);
          /**
           * If connected, resolve w/ accessToken
           */
          if (response.status === 'connected') {
            window.localStorage.setItem(LocalStorageKeys.fbUser, true)
            ful(response.authResponse.accessToken);
          } else {
            rej();
          }
        });
      })
      .then(accessToken => {
        /**
         * Then get an accessToken from our API
         */
        return apiLoginFb(acessToken)
          .then(user => {
            dispatch(loginSuccess(user));
          })
          .catch(error => { dispatch(loginError(error)) });
      })

  }

}

/**
 * Log the user out (just remove their tokens)
 * @return {[type]} [description]
 */
export function logout() {

  return dispatch => {

    window.localStorage.removeItem(LocalStorageKeys.bbAccessToken);

    if (!window.localStorage.getItem(LocalStorageKeys.fbUser)) {
      return Promise.resolve();
    }

    return resolveFBHandle()
      .then($fb => {
        $fb.logout(function(response) {

          window.localStorage.removeItem(LocalStorageKeys.fbUser);

          ful();

        });
      })

  }

}
