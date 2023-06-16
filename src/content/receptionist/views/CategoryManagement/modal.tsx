import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import React from 'react';
import { ModalProps } from './types.d';

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        alignItems={'center'}
        justifyContent={'center'}
        display={'flex'}
      >
        {props.title}
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
