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

import { useAgency } from 'src/hooks/useAgency';
import { DashboardContent } from 'src/layouts/dashboard';
import MuiDialog from 'src/components/Dialog';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CommonTableHead } from 'src/components/table/common-table-head';
import { CommonTableRow } from 'src/components/table/common-table-row';
import { CommonTableToolbar } from 'src/components/table/common-table-toolbar';
import { CommonTableNoData } from 'src/components/table/common-table-no-data';
import { emptyRows, applyFilter, getComparator } from 'src/components/table/table-utils';
import { AddAgencyForm } from '../agency-forms/add-agency-form';
import { useTags } from 'src/hooks/useTags';

// ----------------------------------------------------------------------

type AgencyProps = {
  id?: string;
  name: string;
  description: string;
  createdAt: string;
};

export function AgenciesView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const { data: agencies, isLoading, isError } = useAgency();
  const { data: tags, isLoading: tagsLoading, isError:tagsError } = useTags();

  const tagNames = tags ? tags?.data.map((tag: any) => tag.name) : [];


  const dataFiltered = applyFilter({
    inputData: (agencies?.data || []).map((agency) => {return {
      ...agency,
      id: agency.id !== undefined ? String(agency.id) : undefined,
    }}),
    comparator: getComparator<AgencyProps>(table.order, table.orderBy as keyof AgencyProps),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography color="error">Error loading agencies</Typography>;
  }

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Agencies Management
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleClickOpen}
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New Agency
        </Button>

        <MuiDialog
          open={isOpen}
          onClose={handleClose}
          title="Add New Agency"
          maxWidth="md"
          fullWidth
          actions={
            <Button onClick={handleClose}>Cancel</Button>
          }
        >
          <AddAgencyForm tags={tagNames}/>
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
          placeholder="Search agencies..."
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CommonTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={agencies?.data?.length || 0}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    (agencies?.data?.map((agency) => agency.id !== undefined ? String(agency.id) : undefined).filter((id): id is string => typeof id === 'string')) || []
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'createdAt', label: 'Created At' },
                  { id: 'actions', label: 'Actions' },
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
                        { id: 'description' },
                        { 
                          id: 'createdAt',
                          render: (value) => new Date(value).toLocaleDateString()
                        },
                        { id: 'actions' }
                      ]}
                      actions={[
                        {
                          label: 'Edit',
                          icon: 'eva:edit-fill',
                          onClick: (row) => {
                            console.log('Edit', row);
                          },
                        },
                        {
                          label: 'Delete',
                          icon: 'eva:trash-2-outline',
                          color: 'error.main',
                          onClick: (row) => {
                            console.log('Delete', row);
                          },
                        },
                      ]}
                    />
                  ))}

                {notFound && (
                  <CommonTableNoData 
                    searchQuery={filterName}
                    colspan={5}
                    message="No agencies found matching your search criteria."
                  />
                )}

                {!notFound && (
                  <TableRow style={{ height: 53 * emptyRows(table.page, table.rowsPerPage, agencies?.data?.length || 0) }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={agencies?.data?.length || 0}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}


  
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
