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

/**
 * FB Login Check
 *
 * @return Function
 */
export function fbLoginCheck() {

  return dispatch =>
    {
      return new Promise((ful, rej) => {
        let waitInt = setInterval(() => {
          if (typeof FB !== 'undefined') {
            clearInterval(waitInt);
            ful();
          }
        }, 1000)
      })
      .then(() => {

        return new Promise((ful, rej) => {
          FB.getLoginStatus((response) => {
            ful(response)
          });
        })
      })
      .then(response => {

        console.log(response);
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          //TODO: use an action, or a redux-router call or something, not window.location.href
          window.location.href = "/campaign";
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

    return new Promise((ful, rej) => {

      FB.login(function(response) {
        console.log(response);
        if (response.status === 'connected') {
          let {accessToken} = response.authResponse;
          console.log('TODO...get a bb access token from the API!');
          ful();
        } else {
          rej();
        }

      });

    })

  }

}
