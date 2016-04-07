import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from 'client/components/App'
import reducers from 'client/reducers'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import ForgotPassword from 'client/components/pages/ForgotPassword'
import Login from 'client/components/pages/Login'
import LoginOptions from 'client/components/pages/LoginOptions'
import Signup from 'client/components/pages/Signup'


require('client/style/app');

const store = createStore(reducers)

const history = syncHistoryWithStore(browserHistory, store)

const rootElement = document.getElementById('root')

render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="forgot" component={ForgotPassword}/>
          <Route path="login/options" component={LoginOptions}/>
          <Route path="login" component={Login}/>
          <Route path="signup" component={Signup}/>
        </Route>
      </Router>
    </Provider>,
    rootElement
);