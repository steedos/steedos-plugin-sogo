import * as React from 'react';
import Paper from '@material-ui/core/Paper';

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
        super(props)
    }

    componentDidMount() {
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

export default SteedosGrid