import { Snackbar, Alert, AlertColor } from '@mui/material';
import React from 'react';
import { SnackBarType } from './types.d';

const SnackBarComponent: React.FC<SnackBarType> = (props) => {
  return (
    <>
      <Snackbar
        open={props.isOpen}
        autoHideDuration={6000}
        onClose={props.handleClose}
      >
        <Alert
          onClose={props.handleClose}
          severity={(props.severity as AlertColor) || 'success'}
          sx={{ width: '100%' }}
        >
          {props.children}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackBarComponent;
