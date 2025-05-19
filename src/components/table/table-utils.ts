export function emptyRows(page: number, rowsPerPage: number, arrayLength: number): number {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

export function getComparator<T>(order: 'asc' | 'desc', orderBy: keyof T) {
  return order === 'desc'
    ? (a: T, b: T) => descendingComparator(a, b, orderBy)
    : (a: T, b: T) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (!a || !b) return 0;
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function applyFilter<T>({ 
  inputData, 
  comparator, 
  filterName,
  filterField = 'name'
}: {
  inputData: T[];
  comparator: (a: T, b: T) => number;
  filterName: string;
  filterField?: string;
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
      (item: any) => item[filterField]?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}