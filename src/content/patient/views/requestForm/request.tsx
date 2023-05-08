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

type RequestType = {
  requestedBy?: any;
  dateRequested?: any;
  remarks?: any;
  setRequestedBy?: any;
  setDateRequested?: any;
  setRemarks?: any;
};

const Request: React.FC<RequestType> = (props) => {
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
            helperText="Requested By"
            value={props.requestedBy}
            onChange={(e: any) => props.setRequestedBy(e)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="dateRequested"
            required
            fullWidth
            id="dateRequested"
            helperText="Date Requested"
            value={props.dateRequested}
            onChange={(e: any) => props.setDateRequested(e)}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            name="remarks"
            required
            fullWidth
            id="remarks"
            helperText="Remarks"
            value={props.remarks}
            onChange={(e: any) => props.setRemarks(e)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Request;
