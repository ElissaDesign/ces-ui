import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { useTags } from 'src/hooks/useTags';
import { DashboardContent } from 'src/layouts/dashboard';
import MuiDialog from 'src/components/Dialog';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CommonTableHead } from 'src/components/table/common-table-head';
import { CommonTableRow } from 'src/components/table/common-table-row';
import { CommonTableToolbar } from 'src/components/table/common-table-toolbar';
import { CommonTableNoData } from 'src/components/table/common-table-no-data';
import { emptyRows, applyFilter, getComparator } from 'src/components/table/table-utils';
import { AddTagForm } from '../tag-forms/add-tag-form';

// ----------------------------------------------------------------------

type TagProps = {
  id?: string;
  name: string;
};

export function TagsView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const { data: tags, isLoading, isError } = useTags();

  const dataFiltered = applyFilter({
    inputData: (tags?.data || []).map((tag) => {return {
      ...tag,
      id: tag.id !== undefined ? String(tag.id) : undefined,
    }}),
    comparator: getComparator<TagProps>(table.order, table.orderBy as keyof TagProps),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography color="error">Error loading tags</Typography>;
  }

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Tags Management
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleClickOpen}
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New Tag
        </Button>

        <MuiDialog
          open={isOpen}
          onClose={handleClose}
          title="Add New Tag"
          maxWidth="md"
          fullWidth
          actions={
            <Button onClick={handleClose}>Cancel</Button>
          }
        >
          <AddTagForm />
        </MuiDialog>
      </Box>

      <Card>
        <CommonTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          placeholder="Search tags..."
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 600 }}>
              <CommonTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={tags?.data?.length || 0}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tags?.data
                      ?.map((tag) => (tag.id !== undefined ? String(tag.id) : undefined))
                      .filter((id): id is string => typeof id === 'string') || []
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'actions', label: 'Actions', align: 'right' }, // Added align right here
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <CommonTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id ?? '')}
                      onSelectRow={() => table.onSelectRow(row.id ?? '')}
                      columns={[
                        { id: 'name' },
                        { id: 'actions', align: 'right' }, // Added align right here
                      ]}
                      actions={[
                        {
                          label: 'Edit',
                          icon: 'eva:edit-fill',
                          onClick: (row) => {
                            // Handle edit
                            console.log('Edit', row);
                          },
                        },
                        {
                          label: 'Delete',
                          icon: 'eva:trash-2-outline',
                          color: 'error.main',
                          onClick: (row) => {
                            // Handle delete
                            console.log('Delete', row);
                          },
                        },
                      ]}
                    />
                  ))}

                {notFound && (
                  <CommonTableNoData
                    searchQuery={filterName}
                    colspan={3} // Updated to 3 to account for checkbox, name, and actions columns
                    message="No tags found matching your search criteria."
                  />
                )}

                {!notFound && (
                  <TableRow
                    style={{
                      height:
                        53 * emptyRows(table.page, table.rowsPerPage, tags?.data?.length || 0),
                    }}
                  >
                    <TableCell colSpan={3} /> {/* Updated to 3 */}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={tags?.data?.length || 0}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

interface UseTableReturn {
  page: number;
  order: 'asc' | 'desc';
  orderBy: string;
  selected: string[];
  rowsPerPage: number;
  onSort: (id: string) => void;
  onSelectRow: (id: string) => void;
  onResetPage: () => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function useTable(): UseTableReturn {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
