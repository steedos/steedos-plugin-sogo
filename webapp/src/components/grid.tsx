import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { getUsersState } from '../containers/users/state'

import {
    SortingState, SelectionState, PagingState, RowDetailState,
    IntegratedSorting, IntegratedSelection, CustomPaging
} from '@devexpress/dx-react-grid';
import {
    Grid, Table, TableHeaderRow,
    TableSelection,
    PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';


class SteedosGrid extends React.Component {
    constructor(props: any) {
        console.log("constructor constructor this.props", props);
        super(props)
    }

    componentDidMount() {
        console.log("componentDidMount componentDidMount this.props", this.props);
        const { init } = this.props as any
        console.log('init ', init);
        init()
    }

    render() {
        const {
            onSortingChange,
            onSelectionChange,
            onExpandedRowIdsChange,
            onCurrentPageChange,
            onPageSizeChange,
            onColumnOrderChange,
            onColumnWidthsChange,
        } = this.props as any
        const {
            rows,
            sorting,
            selection,
            expandedRowIds,
            currentPage,
            pageSize,
            pageSizes,
            columnOrder,
            columnWidths,
            totalCount,
            columns,
            getRowId
        } = getUsersState(this.props)
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

export default SteedosGrid