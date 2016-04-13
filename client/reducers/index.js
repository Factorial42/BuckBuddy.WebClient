import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import authenticated from 'client/reducers/authenticated'

const reducers = combineReducers({
  authenticated,
  routing: routerReducer
})

export default reducers
