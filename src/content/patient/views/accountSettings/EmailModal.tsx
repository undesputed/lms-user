import React from 'react';
import { modalType } from './types.d';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const AlertDialog: React.FC<modalType> = (props) => {
  const [email, setEmail] = React.useState<string>('');

  const onUpdateEmail = () => {
    props.handleUpdateEmail(email);
  };

  return (
    <Dialog
      onClose={props.onClose}
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
          {props.tittle}
        </Typography>
      </DialogTitle>
      <Box component="form" noValidate m={3} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              name="email"
              required
              fullWidth
              id="email"
              helperText="Enter New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              size="medium"
              sx={{ marginLeft: 1 }}
              variant="contained"
              color="primary"
              startIcon={<PublishIcon />}
              onClick={onUpdateEmail}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default AlertDialog;
