import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextFieldProps,
  Typography
} from '@mui/material';
import React from 'react';

type ModalProps = {
  label?: string;
  textField?: React.ReactElement<TextFieldProps>;
  open?: boolean;
  handleClose?: () => void;
  onChange?: () => void;
  handleUpdate?: () => void;
};

const InfoModal: React.FC<ModalProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'bolder', color: 'black' }}
        >
          Enter New {props.label}
        </Typography>
      </DialogTitle>
      <DialogContent>{props.textField}</DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleUpdate} autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoModal;
