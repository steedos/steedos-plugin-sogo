import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import { getEntityState } from '../states/entitys'
const userListColumns = [
    { name: 'user', title: 'userId' },
    { name: 'name', title: 'name' },
    { name: 'username', title: 'username' },
    { name: 'email', title: 'email' },
    { name: 'mobile', title: 'mobile' },
    { name: 'position', title: 'position' }
];
const initialStore = {
    entities: {
        space_users: {
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
        },
        organizations: {
            id: "organizations-tree",
            noHeading: true,
            rootNodes: ["51ae9b1a8e296a29c9000002"],
            nodes: [],
            selectedNode: [],
            pageSize: 1000000,
            $select: ['_id', 'name', 'fullname', 'children'],
            getNodes: function(node){
                if(!node.nodes){
                    return []
                }
                let nodes = []
                let stateNodes = getEntityState(store.getState(), 'organizations').nodes
                node.nodes.forEach((element) => {
                    if(stateNodes[element]){
                        nodes.push(stateNodes[element])
                    }
                });
                return nodes
            }
        }
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