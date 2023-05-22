import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type SnackbarProps = {
  open: boolean;
  autoHideDuration: number;
  onClose: () => void;
  severity: 'success' | 'error' | 'warning' | 'info';
  children: any;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackBar: React.FC<SnackbarProps> = (props) => {
  return (
    <>
      <Snackbar
        open={props.open}
        autoHideDuration={props.autoHideDuration}
        onClose={props.onClose}
      >
        <Alert
          onClose={props.onClose}
          severity={props.severity}
          sx={{ width: '100%' }}
        >
          {props.children}
        </Alert>
      </Snackbar>
    </>
  );
};

CustomSnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.oneOf<'success' | 'error' | 'warning' | 'info'>([
    'success',
    'error',
    'warning',
    'info'
  ]).isRequired,
  children: PropTypes.node.isRequired
};

export default CustomSnackBar;
