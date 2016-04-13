import { login as apiLogin } from 'client/data/user'
import { resolveFBHandle } from 'client/lib/fb'
import { browserHistory } from 'react-router'
import { hasSession, clearSession, isFbSession, setToken } from 'client/data/userLocalSession'

export function loginError(error) {
  return dispatch => {
    dispatch({ error, type: 'LOGGED_FAILED' });
  };
}
/*
 * Should add the route like parameter in this method
*/
export function loginSuccess(user) {
  return dispatch => {

    let token = user.token;
    setToken(token);

    dispatch({ user, type: 'LOGGED_SUCCESSFULLY' });
    browserHistory.push('/campaign'); // will fire CHANGE_ROUTE in its change handler
  };
}

export function logoutSuccess() {
  return dispatch => {

    browserHistory.push("/")

    dispatch({ type: 'LOGGED_OUT_SUCCESSFULLY' });

  }
}

export function login(credentials) {
  return dispatch =>
    apiLogin(credentials)
    .then(user => {
      dispatch(loginSuccess(user));
    })
    .catch(error => { dispatch(loginError(error)) });
}

export function loginFb(accessToken) {
  return dispatch =>
    apiLoginFb(accessToken)
    .then(user => {
      dispatch(loginSuccess(user));
    })
    .catch(error => { dispatch(loginError(error)) });
}

export function redirectAuthedUsers() {
  return dispatch => {
    if (hasSession()) {
      browserHistory.push('/campaign');
    }
  }
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
            browserHistory.push('/campaign');
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
            userLocalSession.setFb();
            ful(response.authResponse.accessToken);
          } else {
            rej();
          }
        });
      })
      .then(accessToken => {
        dispatch(loginFb(accessToken));
      })

  }

}



/**
 * Logout helper
 */
const _logout = dispatch => {

  let isFb = isFbSession();

  clearSession();

  if (!isFb) {
    return Promise.resolve();
  }

  return resolveFBHandle()
    .then($fb => {
      $fb.logout(function(response) {

        ful();

      });
    })
}

/**
 * Log the user out and redirect
 *
 * @return {[type]} [description]
 */
export function logout() {

  return dispatch => {

    _logout()
      .then(() => dispatch(logoutSuccess()))

  }

}
