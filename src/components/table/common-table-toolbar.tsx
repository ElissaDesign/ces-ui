import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

type Props = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function CommonTableToolbar({ 
  numSelected, 
  filterName, 
  onFilterName,
  placeholder = 'Search...'
}: Props) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        }),
      }}
    >
      <OutlinedInput
        value={filterName}
        onChange={onFilterName}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
    </Toolbar>
  );
}

// filepath: c:\Users\Amir\OneDrive\Desktop\ces-ui\src\components\table\table-utils.ts
export function emptyRows(page: number, rowsPerPage: number, arrayLength: number): number {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

export function getComparator(order: 'asc' | 'desc', orderBy: string) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function applyFilter<T>({ inputData, comparator, filterName }: {
  inputData: T[];
  comparator: (a: T, b: T) => number;
  filterName: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (item: any) =>
        Object.keys(item).some(
          (key) =>
            item[key]?.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        )
    );
  }

  return inputData;
}