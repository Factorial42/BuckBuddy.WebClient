import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import login from 'client/reducers/login'

const reducers = combineReducers({
  login,
  routing: routerReducer
})

export default reducers
