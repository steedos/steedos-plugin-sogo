
import { USERS_STATE_CHANGE_ACTION } from './action'
import store from '../../stores/configureStore';
import { loadUsersData } from './action'
function reducer(state: any = {}, action: any){
    if (action.type === USERS_STATE_CHANGE_ACTION) {
        console.log("users.reducer action", action, state)
        switch (action.partialStateName) {
            case 'loadDataSauce':
                return Object.assign({}, state, { rows: action.partialStateValue.records, totalCount: action.partialStateValue.totalCount });
            case 'filters': //TODO 优化此处代码，当filters发生编号时，如何抓取数据
               store.dispatch(loadUsersData({ currentPage: state.currentPage, pageSize: state.pageSize, filters: action.partialStateValue }));
            default:
                break;
        }
        return {
            ...state,
            [action.partialStateName]: action.partialStateValue,
        };
    }

    return state;
};

export default reducer;