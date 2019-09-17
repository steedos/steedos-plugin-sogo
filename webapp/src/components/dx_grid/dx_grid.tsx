import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import {
    SortingState, SelectionState, PagingState, RowDetailState,SearchState,IntegratedFiltering,
    IntegratedSorting, IntegratedSelection, CustomPaging
} from '@devexpress/dx-react-grid';
import {
    Grid, Table, TableHeaderRow,
    TableSelection,SearchPanel,
    PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';


class SteedosDXGrid extends React.Component {
    constructor(props: any) {
        console.log("constructor constructor this.props", props);
        super(props)
    }

    componentDidMount() {
        console.log("componentDidMount componentDidMount this.props", this.props);
        const { init } = this.props as any
        init(this.props)
    }

    render() {
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
            getRowId,
            searchValue,
            onSortingChange,
            onSelectionChange,
            onExpandedRowIdsChange,
            onCurrentPageChange,
            onPageSizeChange,
            onColumnOrderChange,
            onColumnWidthsChange,
            onSearchValueChange
        } = this.props as any
        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <SearchState value={searchValue} onValueChange={onSearchValueChange}/>
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
                    <IntegratedFiltering />
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
                    <SearchPanel />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </Paper>
        );
    }
}

export default SteedosDXGrid