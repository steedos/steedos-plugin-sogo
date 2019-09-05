import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import { USERS_STATE_CHANGE_ACTION } from './action'


function reducer(state: any = {}, action: any){
    if (action.type === USERS_STATE_CHANGE_ACTION) {
        console.log("users.reducer action", action, state)
        switch (action.partialStateName) {
            case 'loadDataSauce':
                return Object.assign({}, state, { rows: action.partialStateValue.records, totalCount: action.partialStateValue.totalCount });
            default:
                break;
        }

        // switch (action.partialStateName) {
        //     case 'pageSize':
        //         store.dispatch(loadUserData({ currentPage: state.currentPage, pageSize: action.partialStateValue }));
        //         break;

        //     case 'currentPage':
        //         store.dispatch(loadUserData({ currentPage: action.partialStateValue, pageSize: state.pageSize }));
        //         break
        //     default:
        //         break;
        // }

        return {
            ...state,
            [action.partialStateName]: action.partialStateValue,
        };

    }

    return state;
};

export default reducer;