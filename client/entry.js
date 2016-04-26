import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from 'client/components/App'
import reducers from 'client/reducers'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { loadUserFromSession } from 'client/actions/session'

require('client/style/app');

/**
 * Store setup
 */
const loggerMiddleware = createLogger()
const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ))
const history = syncHistoryWithStore(browserHistory, store)

/**
 * Page imports
 */
import ForgotPassword from 'client/components/pages/ForgotPassword'
import Login from 'client/components/pages/Login'
import LoginOptions from 'client/components/pages/LoginOptions'
import Signup from 'client/components/pages/Signup'
import SignupActivate from 'client/components/pages/SignupActivate'
import SignupFacebook from 'client/components/pages/SignupFacebook'
import SignupPhotoPage from 'client/components/pages/SignupPhoto'
import CampaignStartPage from 'client/components/pages/CampaignStart'
import Campaign from 'client/components/pages/Campaign'
import StripeConnect from 'client/components/pages/StripeConnect'
import StripeTos from 'client/components/pages/StripeTos'
import NotFound from 'client/components/pages/NotFound'

const rootElement = document.getElementById('root')

/**
 * Render the application
 */
render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="forgot" component={ForgotPassword}/>
          <Route path="login/options" component={LoginOptions}/>
          <Route path="u/:userSlug/c/:campaignSlug" component={Campaign}/>
          <Route path="u/:token/activate" component={SignupActivate}/>
          <Route path="campaign/start" component={CampaignStartPage}/>
          <Route path="login" component={Login}/>
          <Route path="signup" component={Signup}/>
          <Route path="signup/stripe" component={StripeConnect}/>
          <Route path="signup/facebook" component={SignupFacebook}/>
          <Route path="signup/photo" component={SignupPhotoPage}/>
          <Route path="signup/stripe/tos" component={StripeTos}/>
          <Route path="404" component={NotFound}/>
          <Redirect from="*" to="/404" />
        </Route>
      </Router>
    </Provider>,
    rootElement
);

/**
 * Load the user into state, if they have a session
 */
store.dispatch(loadUserFromSession());
