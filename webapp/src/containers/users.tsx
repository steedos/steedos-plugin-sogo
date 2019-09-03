import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {
  SortingState, SelectionState, PagingState, RowDetailState,
  IntegratedSorting, IntegratedSelection, CustomPaging
} from '@devexpress/dx-react-grid';
import {
  Grid, Table, TableHeaderRow,
  TableSelection,
  PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';


import * as DataSource from '../datasource/users'

const userListColumns = [
  { name: 'user', title: 'userId' },
  { name: 'name', title: 'name' },
  { name: 'username', title: 'username' },
  { name: 'email', title: 'email' },
  { name: 'mobile', title: 'mobile' },
  { name: 'position', title: 'position' }
];
export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

class UsersListContainer extends React.Component{
  constructor(props: any) {
    super(props)
  }

  componentDidMount(){
    const { init } = this.props as any
    console.log('init ', init);
    init()
  }

  render() {
    const {
      rows,
      sorting,
      onSortingChange,
      selection,
      onSelectionChange,
      expandedRowIds,
      onExpandedRowIdsChange,
      currentPage,
      onCurrentPageChange,
      pageSize,
      onPageSizeChange,
      pageSizes,
      columnOrder,
      onColumnOrderChange,
      columnWidths,
      onColumnWidthsChange,
      totalCount,
      columns,
      getRowId
    } = this.props as any

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
  
          <SortingState
            sorting={sorting}
            onSortingChange={onSortingChange}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={onCurrentPageChange}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
          />
          <CustomPaging
            totalCount={totalCount}
          />
          <RowDetailState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={onExpandedRowIdsChange}
          />
          <SelectionState
            selection={selection}
            onSelectionChange={onSelectionChange}
          />
  
          <IntegratedSorting />
          <IntegratedSelection />
  
          <DragDropProvider />
  
          <Table />
  
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={onColumnWidthsChange}
          />
          <TableHeaderRow showSortingControls />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={onColumnOrderChange}
          />
  
          <TableSelection showSelectAll />
          <Toolbar />
          <PagingPanel
            pageSizes={pageSizes}
          />
        </Grid>
      </Paper>
    );
  }
}

const loadData = async function (options: any) {
  console.log('loadData......', options);
  let { pageSize, currentPage } = options
  const query: any = { top: pageSize, skip: currentPage * pageSize };
  //防止重复加载
  // console.log('this.lastQuery', this.lastQuery);
  // console.log('query', JSON.stringify(query));
  // if(this.lastQuery === JSON.stringify(query)){
  //   console.log('set loading false');
  //   this.setState({ loading: false });
  //   return;
  // }
  return (new DataSource.Users).getUsers(query)
}

function loadUserData(options: any) {
  return function (dispatch: any) {
    return loadData(options).then(
      (sauce) => dispatch(loadDataSauce(sauce)),
      (error) => dispatch(loadDataError(error)),
    );
  };
}

function loadDataSauce(...args: any) {
  console.log("loadDataSauce", args);
  if(args.length === 0 ){
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


const gridInitialState = {
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
  getRowId: (row: any) => row.user,
  init: ()=> store.dispatch(loadUserData({}))
};

const gridReducer = (state = gridInitialState, action: any) => {
  console.log("gridReducer action", action, state)

  if (action.type === GRID_STATE_CHANGE_ACTION) {

    switch (action.partialStateName) {
      case 'pageSize':
        store.dispatch(loadUserData({ currentPage: state.currentPage, pageSize: action.partialStateValue }));
        break;

      case 'currentPage':
        store.dispatch(loadUserData({ currentPage: action.partialStateValue, pageSize: state.pageSize }));
        break
      default:
        break;
    }

    return {
      ...state,
      [action.partialStateName]: action.partialStateValue,
    };

  } else if (action.type === 'LOADDATASAUCE') {
    return Object.assign({}, state, { rows: action.rows, totalCount: action.totalCount });
  }
  console.log("gridReducer state", state)
  return state;
};

export const createGridAction = (partialStateName: any, partialStateValue: any) => ({
  type: GRID_STATE_CHANGE_ACTION,
  partialStateName,
  partialStateValue,
});

const mapStateToProps = (state: any) => state;

const mapDispatchToProps = (dispatch: any) => ({
  onSortingChange: (sorting: any) => dispatch(createGridAction('sorting', sorting)),
  onSelectionChange: (selection: any) => dispatch(createGridAction('selection', selection)),
  onExpandedRowIdsChange: (expandedRowIds: any) => dispatch(createGridAction('expandedRowIds', expandedRowIds)),
  onGroupingChange: (grouping: any) => dispatch(createGridAction('grouping', grouping)),
  onExpandedGroupsChange: (expandedGroups: any) => dispatch(createGridAction('expandedGroups', expandedGroups)),
  onFiltersChange: (filters: any) => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: (currentPage: any) => dispatch(createGridAction('currentPage', currentPage)),
  onPageSizeChange: (pageSize: any) => dispatch(createGridAction('pageSize', pageSize)),
  onColumnOrderChange: (order: any) => dispatch(createGridAction('columnOrder', order)),
  onColumnWidthsChange: (widths: any) => dispatch(createGridAction('columnWidths', widths)),
});

const ReduxGridContainer: any = connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);

const store = createStore(
  gridReducer,
  applyMiddleware(thunkMiddleware)
);


export default () => (
  <Provider store={store}>
    <ReduxGridContainer />
  </Provider>
);