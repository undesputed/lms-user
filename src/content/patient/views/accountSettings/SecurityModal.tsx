import {
  Dialog,
  DialogTitle,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider
} from '@mui/material';
import React from 'react';
import { securityType } from './types.d';
import PublishIcon from '@mui/icons-material/Publish';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const SecurityModal: React.FC<securityType> = (props) => {
  const [email, setEmail] = React.useState<string>('');
  const [oldPassword, setOldPassword] = React.useState<string>('');
  const [newPass, setNewPass] = React.useState<string>('');
  const [confirmPass, setConfirmPass] = React.useState<string>('');

  const onSubmit = (e: any) => {
    if (newPass !== confirmPass) {
      props.handleOnClose();
      props.setIsError();
      e.preventDefault();
    }

    if (!email || !oldPassword || !newPass || !confirmPass) {
      props.handleOnClose();
      props.setIsError();
      e.preventDefault();
    }
    props.handleOnSubmit(email, oldPassword, newPass, confirmPass);
  };

  return (
    <>
      <Dialog
        onClose={props.handleOnClose}
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{
          p: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <DialogTitle>
          <Typography component="h1" variant="inherit" align="center">
            {props.title}
          </Typography>
        </DialogTitle>
        <Box component="form" noValidate m={3} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                type="email"
                name="email"
                required
                fullWidth
                id="email"
                helperText="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                type="password"
                name="oldPassword"
                required
                fullWidth
                id="oldPassword"
                helperText="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Grid>
            <Divider light sx={{ m: 2 }} />
            <Grid item xs={12} md={12}>
              <TextField
                type="password"
                name="newPassword"
                required
                fullWidth
                id="newPassword"
                helperText="Enter New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                type="password"
                name="confirmPass"
                required
                fullWidth
                id="confirmPass"
                helperText="Please Re-Type Your New Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button
                size="medium"
                sx={{ marginRight: 1 }}
                variant="outlined"
                color="primary"
                startIcon={<ExitToAppIcon />}
                onClick={props.handleOnClose}
              >
                Cancel
              </Button>
              <Button
                size="medium"
                sx={{ marginLeft: 1 }}
                variant="contained"
                color="primary"
                startIcon={<PublishIcon />}
                onClick={onSubmit}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default SecurityModal;
