import * as DataSource from '../../datasource/users'

export const USERS_STATE_CHANGE_ACTION = 'USERS_STATE_CHANGE';

export const createGridAction = (partialStateName: any, partialStateValue: any) => ({
    type: USERS_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
});


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
    let { pageSize, currentPage } = options
    const query: any = { top: pageSize, skip: currentPage * pageSize };
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