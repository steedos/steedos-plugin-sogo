import { combineReducers } from 'redux'

import organizations from '../containers/organizations/reducer'
import users from '../containers/users/reducer'

export default combineReducers({
    organizations,
    users
})