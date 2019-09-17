import { combineReducers } from 'redux'

import organizations from '../containers/organizations/reducer'
import entitiesReducer from './entities'
import selectUser from '../containers/select_users/reducer'
import {DXGRID_STATE_CHANGE_ACTION} from '../actions/views/dx_grid'

const combinedReducer = combineReducers({
    organizations,
    entities: entitiesReducer,
    selectUser
})

function crossSliceReducer(state: any, action: any) {
    if (action.type === 'ORGANIZATIONS__STATE_CHANGE') {

    }
    switch (action.partialStateName) {
        case 'onClick': {
            if (state.organizations.selectedNode.length > 0) {
                return Object.assign({}, state, {
                    entities: {
                        space_users: (entitiesReducer(state.entities, {
                            type: DXGRID_STATE_CHANGE_ACTION,
                            partialStateName: "filters",
                            partialStateValue: [{ columnName: "organizations", value: state.organizations.selectedNode[0], operation: "equals" }],
                            objectName: 'space_users'
                        })).space_users
                    }
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