import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

import { getOrganizationsState } from '../containers/organizations/state'
const userListColumns = [
    { name: 'user', title: 'userId' },
    { name: 'name', title: 'name' },
    { name: 'username', title: 'username' },
    { name: 'email', title: 'email' },
    { name: 'mobile', title: 'mobile' },
    { name: 'position', title: 'position' }
];
const initialStore = {
    organizations: {
        id: "organizations-tree",
        noHeading: true,
        rootNodes: ["51ae9b1a8e296a29c9000002"],
        nodes: [],
        selectedNode: [],
        getNodes: function(node){
            if(!node.nodes){
                return []
            }
            let nodes = []
            let stateNodes = getOrganizationsState(store.getState()).nodes
            node.nodes.forEach((element) => {
                if(stateNodes[element]){
                    nodes.push(stateNodes[element])
                }
            });
            return nodes
        }
    },
    users: {
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
        getRowId: (row) => row.user
    }
}

function configureStore(rootReducer, initialStore) {
    return createStore(
        rootReducer,
        initialStore,
        applyMiddleware(thunkMiddleware)
    )
}

const store = configureStore(rootReducer, initialStore);

export default store;