import * as DataSource from '../../datasource/organizations'

export const ORGANIZATIONS__STATE_CHANGE_ACTION = 'ORGANIZATIONS__STATE_CHANGE';

export const createGridAction = (partialStateName: any, partialStateValue: any) => ({
    type: ORGANIZATIONS__STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
});


export function loadOrganizationsData(options: any) {
    console.log("loadUserData options", options)
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
    return (new DataSource.Organizations).getOrganizations(query)
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