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
        <Typography variant="h4" align="center">
          {props.tittle}
        </Typography>
      </DialogTitle>
      <Box component="form" noValidate m={3} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              name="firstName"
              required
              fullWidth
              id="firstName"
              helperText="First Name"
              value={props.profile?.firstName}
              onChange={(e: any) => props.handleOnChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              name="middleName"
              required
              fullWidth
              id="middleName"
              helperText="M.I"
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              name="lastName"
              required
              fullWidth
              id="lastName"
              helperText="last Name"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="date"
              id="outlined-select-currency"
              helperText="Birthday"
              style={{
                width: '100%'
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="number"
              id="outlined-select-currency"
              helperText="Age"
              disabled
              style={{
                width: '100%'
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sex</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
                <Divider />
                <MenuItem value={3}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              id="outlined-select-currency"
              helperText="Complete Address"
              style={{
                width: '100%'
              }}
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
              onClick={props.handleUpdateDetails}
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
