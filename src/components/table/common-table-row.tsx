import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import { Iconify } from 'src/components/iconify';

type Props = {
  selected: boolean;
  onSelectRow: () => void;
  row: any; // This will be your tag or user object
  columns: Array<{
    id: string;
    align?: 'left' | 'right' | 'center';
    render?: (row: any) => React.ReactNode;
  }>;
  actions?: Array<{
    label: string;
    icon: string;
    color?: string;
    onClick: (row: any) => void;
  }>;
};

export function CommonTableRow({ row, selected, onSelectRow, columns, actions }: Props) {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      {columns.map((column) => (
        <TableCell key={column.id} align={column.align || 'left'}>
          {column.render ? column.render(row) : row[column.id]}
        </TableCell>
      ))}

      {actions && (
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>

          <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { width: 140 },
            }}
          >
            {actions.map((action) => (
              <MenuItem
                key={action.label}
                onClick={() => {
                  action.onClick(row);
                  handleCloseMenu();
                }}
                sx={{ color: action.color }}
              >
                <Iconify icon={action.icon} sx={{ mr: 2 }} />
                {action.label}
              </MenuItem>
            ))}
          </Popover>
        </TableCell>
      )}
    </TableRow>
  );
}