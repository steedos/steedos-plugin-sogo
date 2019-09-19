import * as React from 'react';
import DXGrid from '../../components/dx_grid'
import SteedosTree from '../../components/tree'
import PropTypes from 'prop-types';
import { getEntityState } from '../../states/entitys'
import store from '../../stores/configureStore'

class SelectUsers extends React.Component {
    static defaultProps = {
        valueField: '_id'
    }

    static propTypes = {
        rootNodes: PropTypes.array.isRequired,
        multiple: PropTypes.bool,
        valueField: PropTypes.string //指定控件返回的值来自记录的那个属性，比如：user 字段，或者 email字段
    }

    render() {
        //Grid props
        let userListColumns = [
            { name: 'user', title: 'userId' },
            { name: 'name', title: 'name' },
            { name: 'username', title: 'username' },
            { name: 'email', title: 'email' },
            { name: 'mobile', title: 'mobile' },
            { name: 'position', title: 'position' }
        ]
        let getRowId = (row: any) => row[(this.props as any).valueField]

        //Tree props
        let { rootNodes } = this.props as any
        let $select_org = ['_id', 'name', 'fullname', 'children']
        let getNodes = function(node: any){
            if(!node.nodes){
                return []
            }
            let entityState = getEntityState(store.getState(), 'organizations') || {}
            let nodes: any = []
            let stateNodes = entityState.nodes || []
            node.nodes.forEach((element: any) => {
                if(stateNodes[element]){
                    nodes.push(stateNodes[element])
                }
            });
            return nodes
        }

        return (
            <div className="slds-grid">
                <div className="left"><SteedosTree objectName='organizations' rootNodes={rootNodes} $select={$select_org} getNodes={getNodes}/></div>
                <div className="right"><DXGrid objectName='space_users' columns={userListColumns} getRowId={getRowId} /></div>
            </div>
        )
    }
}
export default SelectUsers