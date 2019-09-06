import { combineReducers } from 'redux'

import organizations from '../containers/organizations/reducer'
import users from '../containers/users/reducer'
import selectUser from '../containers/select_users/reducer'
import store from '../stores/configureStore';

const combinedReducer = combineReducers({
    organizations,
    users,
    selectUser
})

function crossSliceReducer(state: any, action: any) {
    console.log('crossSliceReducer state', state);
    // console.log('crossSliceReducer action', action);
    if(action.type === 'ORGANIZATIONS__STATE_CHANGE'){

    }
    switch (action.partialStateName) {
        case 'onClick': {
            if(state.organizations.selectedNode.length > 0){
                return Object.assign({}, state, {
                    users: users(state.users, {
                        type: "USERS_STATE_CHANGE",
                        partialStateName: "filters",
                        partialStateValue: [{columnName: "organizations", value: state.organizations.selectedNode[0], operation: "equals"}],
                    })
                })
            }
            return state
        }
        default:
            return state
    }
}

function rootReducer(state: any, action: any) {
    const intermediateState = combinedReducer(state, action)
    const finalState = crossSliceReducer(intermediateState, action)
    return finalState
}

export default rootReducer