import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Avatar,
  Typography
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type SuccessModalProps = {
  open: boolean;
  handleClose: () => void;
};

const PromptModal: React.FC<SuccessModalProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="success-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="success-dialog-title">Success</DialogTitle>
      <DialogContent
        sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            marginBottom: 2,
            backgroundColor: 'green'
          }}
        >
          <CheckCircleIcon sx={{ width: 60, height: 60 }} />
        </Avatar>
        <Typography>SUCCESS!!</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default PromptModal;
