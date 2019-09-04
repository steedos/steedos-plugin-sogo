import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import { ORGANIZATIONS__STATE_CHANGE_ACTION, loadUserData } from './action'

import _ from 'underscore'

const sampleNodes = {
	0: {
		id: 0,
		nodes: [1, 2, 3, 7],
	},
	1: {
		label: 'Grains',
		type: 'item',
		id: 1,
	},
	2: {
		label: 'Fruits',
		type: 'branch',
		id: 2,
		nodes: [4, 5],
	},
	3: {
		label: 'Nuts',
		type: 'branch',
		_iconClass: 'glyphicon-file',
		id: 3,
		nodes: [8, 9, 10, 11],
	},
	4: {
		assistiveText: 'Ground Fruits',
		label: 'Ground Fruits',
		type: 'branch',
		id: 4,
		nodes: [12, 13, 14],
	},
	5: {
		label: 'Tree Fruits',
		type: 'branch',
		id: 5,
		nodes: [15, 16, 17, 18, 19, 6],
	},
	6: {
		label: 'Raspberries',
		type: 'item',
		id: 6,
	},
	7: {
		label: 'Empty folder',
		type: 'branch',
		id: 7,
	},
	8: {
		label: 'Almonds',
		type: 'item',
		id: 8,
	},
	9: {
		label: 'Cashews',
		type: 'item',
		id: 9,
	},
	10: {
		label: 'Pecans',
		type: 'item',
		id: 10,
	},
	11: {
		label: 'Walnuts',
		type: 'item',
		id: 11,
	},
	12: {
		label: 'Watermelon',
		type: 'item',
		id: 12,
	},
	13: {
		label: 'Canteloupe',
		type: 'item',
		_iconClass: 'glyphicon-file',
		id: 13,
	},
	14: {
		label: 'Strawberries',
		type: 'item',
		id: 14,
	},
	15: {
		label: 'Peaches',
		type: 'item',
		id: 15,
	},
	16: {
		label: 'Pears',
		type: 'item',
		_iconClass: 'glyphicon-file',
		id: 16,
	},
	17: {
		label: 'Citrus',
		type: 'branch',
		id: 17,
		nodes: [20, 21, 22, 23],
	},
	18: {
		label: 'Apples',
		type: 'branch',
		id: 18,
		nodes: [24, 25, 26, 27],
	},
	19: {
		label: 'Cherries',
		type: 'branch',
		id: 19,
		nodes: [28, 29, 30, 31, 32, 33],
	},
	20: {
		label: 'Orange',
		type: 'item',
		id: 20,
	},
	21: {
		label: 'Grapefruit',
		type: 'item',
		id: 21,
	},
	22: {
		label: 'Lemon',
		type: 'item',
		id: 22,
	},
	23: {
		label: 'Lime',
		type: 'item',
		id: 23,
	},
	24: {
		label: 'Granny Smith',
		type: 'item',
		id: 24,
	},
	25: {
		label: 'Pinklady',
		type: 'item',
		_iconClass: 'glyphicon-file',
		id: 25,
	},
	26: {
		label: 'Rotten',
		type: 'item',
		id: 26,
	},
	27: {
		label: 'Jonathan',
		type: 'item',
		id: 27,
	},
	28: {
		label: 'Balaton',
		type: 'item',
		id: 28,
	},
	29: {
		label: 'Erdi Botermo',
		type: 'item',
		id: 29,
	},
	30: {
		label: 'Montmorency',
		type: 'item',
		id: 30,
	},
	31: {
		label: 'Queen Ann',
		type: 'item',
		id: 31,
	},
	32: {
		label: 'Ulster',
		type: 'item',
		id: 32,
	},
	33: {
		label: 'Viva',
		type: 'item',
		id: 33,
	},
};
const gridInitialState = {
	noHeading: true,
    rootNodes: ["51ae9b1a8e296a29c9000002"],
    nodes: sampleNodes,
    selectedNode: [],
    init: () => store.dispatch(loadUserData({})),
    getNodes: function(node: any){
        if(!node.nodes){
            return []
        }
        let nodes: any = []
        let stateNodes = store.getState().nodes
        node.nodes.forEach((element: any) => {
            if(stateNodes[element]){
                nodes.push(stateNodes[element])
            }
        });
        return nodes
    }
};

/**
 * return: {id: {label: ,type: , id}}
 * @param records 待转换的数据
 */
function transformData(records: any){
    let items: any = {}
    records.forEach((element: any) => {
        let item: any= {id: element._id, label: element.name}
        if( _.isEmpty(element.children)){
            item.type = 'item'
        }else{
            item.type = 'branch'
            item.nodes = element.children
        }
        items[element._id] = item
    });
    return items;
}

export const gridReducer = (state = gridInitialState, action: any) => {
    console.log("gridReducer action", action, state)

    if (action.type === ORGANIZATIONS__STATE_CHANGE_ACTION) {
		let value = action.partialStateValue
		let nodeId: string = value.node.id
        switch (action.partialStateName) {
            case 'onExpandClick':
                state.nodes[value.node.id]["expanded"] = value.expand
                // state.nodes[value.node.id]["selected"] = value.select ? true : value.node.selected;
                // Object.assign({}, state, { nodes: transformData(action.records) });    
                break;
            case 'onClick':
				let selectedNodeIds = state.selectedNode

				if(selectedNodeIds.length > 0){
					(state.nodes[selectedNodeIds[0]] as any).selected = false
				}

                let selected = value.select ? true : value.node.selected
				state.nodes[nodeId]["selected"] = selected
				if(selected){
					state = Object.assign({}, state, { selectedNode: [nodeId]});
				}
            default:
                break;
        }
        console.log({
            ...state,
            [action.partialStateName]: action.partialStateValue,
        });
        return {
            ...state,
            [action.partialStateName]: action.partialStateValue,
        };

    } else if (action.type === 'LOADDATASAUCE') {
        console.log('state-=============', Object.assign({}, state, { nodes: transformData(action.records), totalCount: action.totalCount }))
        return Object.assign({}, state, { nodes: transformData(action.records), totalCount: action.totalCount });
    }
    return state;
};

export const store = createStore(
    gridReducer,
    applyMiddleware(thunkMiddleware)
);