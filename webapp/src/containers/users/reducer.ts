import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import { GRID_STATE_CHANGE_ACTION, loadUserData } from './action'
const userListColumns = [
    { name: 'user', title: 'userId' },
    { name: 'name', title: 'name' },
    { name: 'username', title: 'username' },
    { name: 'email', title: 'email' },
    { name: 'mobile', title: 'mobile' },
    { name: 'position', title: 'position' }
];


const gridInitialState = {
    rows: [],
    sorting: [],
    grouping: [],
    expandedGroups: [],
    selection: [],
    expandedRowIds: [1],
    currentPage: 0,
    pageSize: 10,
    pageSizes: [5, 10, 15],
    totalCount: 0,
    columns: userListColumns,
    getRowId: (row: any) => row.user,
    init: () => store.dispatch(loadUserData({}))
};

export const gridReducer = (state = gridInitialState, action: any) => {
    console.log("gridReducer action", action, state)

    if (action.type === GRID_STATE_CHANGE_ACTION) {

        switch (action.partialStateName) {
            case 'pageSize':
                store.dispatch(loadUserData({ currentPage: state.currentPage, pageSize: action.partialStateValue }));
                break;

            case 'currentPage':
                store.dispatch(loadUserData({ currentPage: action.partialStateValue, pageSize: state.pageSize }));
                break
            default:
                break;
        }

        return {
            ...state,
            [action.partialStateName]: action.partialStateValue,
        };

    } else if (action.type === 'LOADDATASAUCE') {
        return Object.assign({}, state, { rows: action.rows, totalCount: action.totalCount });
    }
    console.log("gridReducer state", state)
    return state;
};

export const store = createStore(
    gridReducer,
    applyMiddleware(thunkMiddleware)
);