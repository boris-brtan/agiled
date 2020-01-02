import { combineReducers } from 'redux'

import settings from './settings'
import vote from './vote'

export default combineReducers({
    settings,
    vote,
})
