import * as React from 'react';
import { connect, Provider } from 'react-redux';

import SteedosGrid from '../../components/grid';
import {createGridAction} from './action'
import store from '../../stores/configureStore'
import { loadUsersData } from './action'

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
  onSearchValueChange: (widths: any) => dispatch(createGridAction('searchValue', widths)),
  init: () => dispatch(loadUsersData({}))
});

const ReduxGridContainer: any = connect(mapStateToProps, mapDispatchToProps)(SteedosGrid);

export default () => (
  <Provider store={store}>
    <ReduxGridContainer />
  </Provider>
);