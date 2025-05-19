import React from 'react';

import Dialog from '@mui/material/Dialog';
import { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

type MuiDialogProps = DialogProps & {
    title?: React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
};

const MuiDialog: React.FC<MuiDialogProps> = ({
    title,
    actions,
    children,
    ...dialogProps
}) => (
    <Dialog {...dialogProps}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent dividers>{children}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
);

export default MuiDialog;