import {
  Paper,
  Box,
  Button,
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Container
} from '@mui/material';
import React from 'react';

const Request = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        my: { xs: 3 },
        p: { xs: 2 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            name="requestedBy"
            required
            fullWidth
            id="requestBy"
            label="Requested By"
            helperText="Requested By"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="dateRequested"
            required
            fullWidth
            id="dateRequested"
            label="Date Requested"
            helperText="Date Requested"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            name="remarks"
            required
            fullWidth
            id="remarks"
            label="Remarks"
            helperText="Remarks"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Request;
