import * as DataSource from '../../datasource/users'
import { getUsersState } from './state';

export const USERS_STATE_CHANGE_ACTION = 'USERS_STATE_CHANGE';

export function createGridAction(partialStateName: any, partialStateValue: any) {
    if(["currentPage", "pageSize", "filters"].includes(partialStateName)){
        return function(dispatch: any, getState: any){

            console.log("partialStateName", partialStateName);
            console.log("partialStateValue", partialStateValue);
            let usersState = getUsersState(getState());

            let options: any = {}
            if(partialStateName === 'currentPage'){
                options.currentPage = partialStateValue
                options.pageSize = usersState.pageSize
            }else if(partialStateName === 'pageSize'){
                options.currentPage = usersState.currentPage
                options.pageSize = partialStateValue
            }else if(partialStateName === 'filters'){
                options.filters = partialStateValue
            }


            loadData(options).then(
                (sauce) => dispatch(loadDataSauce(sauce)),
                (error) => dispatch(loadDataError(error)),
            );
            dispatch({
                type: USERS_STATE_CHANGE_ACTION,
                partialStateName,
                partialStateValue,
            })
        }
    }else{
        return {
            type: USERS_STATE_CHANGE_ACTION,
            partialStateName,
            partialStateValue,
        }
    }
} 


export function loadUsersData(options: any) {
    return function (dispatch: any) {
        return loadData(options).then(
            (sauce) => dispatch(loadDataSauce(sauce)),
            (error) => dispatch(loadDataError(error)),
        );
    };
}

async function loadData(options: any) {
    console.log('loadData......', options);
    let { pageSize, currentPage, filters } = options
    const query: any = { top: pageSize, skip: currentPage * pageSize, filters: filters || [] };
    return (new DataSource.Users).getUsers(query)
}

function loadDataSauce(...args: any) {
    console.log("loadDataSauce", args);
    let records = []
    let totalCount = 0
    if (args.length > 0) {
        records = args[0].value
        totalCount = args[0]["@odata.count"]
    }
    return createGridAction('loadDataSauce', {records, totalCount})
}

function loadDataError(...args: any) {
    console.log("loadDataError", args);
    return createGridAction('loadDataError', {error: args})
}