import { combineReducers } from 'redux'
import test from 'client/reducers/test'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const reducers = combineReducers({
  test,
  routing: routerReducer
})

export default reducers
