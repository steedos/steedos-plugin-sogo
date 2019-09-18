
import { DXGRID_STATE_CHANGE_ACTION, loadEntitiesData } from '../actions/views/dx_grid'
import { TREE_STATE_CHANGE_ACTION } from '../actions/views/tree'
import TreeReducer from './views/tree'
import store from '../stores/configureStore';

function transformEntityState(state: any, action: any){
    const objectName = action.objectName
    return Object.assign({}, state, {[objectName]: {...state[objectName], rows: action.partialStateValue.records, totalCount: action.partialStateValue.totalCount}});
}

function reducer(state: any = {}, action: any){
    if (action.type === DXGRID_STATE_CHANGE_ACTION) {
        const objectName = action.objectName
        switch (action.partialStateName) {
            case 'loadDataSauce':
                return transformEntityState(state, action);
            case 'filters': //TODO 优化此处代码，当filters发生编号时，如何抓取数据
               store.dispatch(loadEntitiesData(Object.assign({}, {...state[objectName], objectName: action.objectName, currentPage: state.currentPage, pageSize: state.pageSize, filters: action.partialStateValue })));
               break;
            default:
                break;
        }
        return Object.assign({}, state, {[objectName]: {...state[objectName], [action.partialStateName]: action.partialStateValue}});
    }else if(action.type === TREE_STATE_CHANGE_ACTION){
        return TreeReducer(state, action)
    }

    return state;
};

export default reducer;