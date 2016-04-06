import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from 'client/components/stateless/App'
import reducers from 'client/reducers'

//require('client/style/app');

const store = createStore(reducers);

const rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
