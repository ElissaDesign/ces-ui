import type { TableRowProps } from '@mui/material/TableRow';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type CommonTableNoDataProps = TableRowProps & {
  searchQuery?: string;
  message?: string;
  colspan?: number;
};

export function CommonTableNoData({ 
  searchQuery, 
  message,
  colspan = 7,
  ...other 
}: CommonTableNoDataProps) {
  return (
    <TableRow {...other}>
      <TableCell align="center" colSpan={colspan}>
        <Box sx={{ py: 15, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Not found
          </Typography>

          <Typography variant="body2">
            {message || (
              <>
                No results found for &nbsp;
                <strong>&quot;{searchQuery}&quot;</strong>.
                <br /> Try checking for typos or using complete words.
              </>
            )}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}