import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import authenticated from 'client/reducers/authenticated'
import user from 'client/reducers/user'
import signupFbToken from 'client/reducers/signupFbToken'
import signupSuggestedValues from 'client/reducers/signupSuggestedValues'
import campaignNew from 'client/reducers/campaignNew'
import loading from 'client/reducers/loading'

const reducers = combineReducers({
  campaignNew,
  authenticated,
  user,
  signupFbToken,
  signupSuggestedValues,
  loading,
  routing: routerReducer
})

export default reducers
