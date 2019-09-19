import { combineReducers } from 'redux'

import entitiesReducer from './entities'
import {DXGRID_STATE_CHANGE_ACTION} from '../actions/views/dx_grid'
import {TREE_STATE_CHANGE_ACTION} from '../actions/views/tree'
import { getEntityState } from '../states/entitys'

const combinedReducer = combineReducers({
    entities: entitiesReducer
})

function crossSliceReducer(state: any, action: any) {
    console.log('state', state);
    if (action.type === TREE_STATE_CHANGE_ACTION) {
        switch (action.partialStateName) {
            case 'onClick': {
                let entityState = getEntityState(state, 'organizations')
                if (entityState.selectedNode.length > 0) {
                    return Object.assign({}, state, {
                        entities: {
                            ...state.entities,
                            space_users: (entitiesReducer(state.entities, {
                                type: DXGRID_STATE_CHANGE_ACTION,
                                partialStateName: "filters",
                                partialStateValue: [{ columnName: "organizations", value: entityState.selectedNode[0], operation: "equals" }],
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
    }else{
        return state;
    }
}

function rootReducer(state: any, action: any) {
    const intermediateState = combinedReducer(state, action)
    const finalState = crossSliceReducer(intermediateState, action)
    return finalState
}

export default rootReducer