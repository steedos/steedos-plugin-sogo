import * as DataSource from '../../datasource/users'

export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

export const createGridAction = (partialStateName: any, partialStateValue: any) => ({
    type: GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
});

const loadData = async function (options: any) {
    console.log('loadData......', options);
    let { pageSize, currentPage } = options
    const query: any = { top: pageSize, skip: currentPage * pageSize };
    return (new DataSource.Users).getUsers(query)
}

export function loadUserData(options: any) {
    return function (dispatch: any) {
        return loadData(options).then(
            (sauce) => dispatch(loadDataSauce(sauce)),
            (error) => dispatch(loadDataError(error)),
        );
    };
}

function loadDataSauce(...args: any) {
    console.log("loadDataSauce", args);
    if (args.length === 0) {
        return {
            type: "LOADDATASAUCE",
            rows: [],
            totalCount: 0
        }
    }
    return {
        type: "LOADDATASAUCE",
        rows: args[0].value,
        totalCount: args[0]["@odata.count"]
    }
}

function loadDataError(...args: any) {
    console.log("loadDataError", args);
    return {
        type: "LOADDATAERROR"
    }
}