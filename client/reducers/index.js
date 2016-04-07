import { combineReducers } from 'redux'
import login from 'client/reducers/login'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const reducers = combineReducers({
  login,
  routing: routerReducer
})

export default reducers
