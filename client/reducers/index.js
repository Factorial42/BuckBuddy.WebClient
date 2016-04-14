import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import authenticated from 'client/reducers/authenticated'
import signupFbToken from 'client/reducers/signupFbToken'
import signupSuggestedValues from 'client/reducers/signupSuggestedValues'
import campaignNew from 'client/reducers/campaignNew'

const reducers = combineReducers({
  campaignNew,
  authenticated,
  signupFbToken,
  signupSuggestedValues,
  routing: routerReducer
})

export default reducers
