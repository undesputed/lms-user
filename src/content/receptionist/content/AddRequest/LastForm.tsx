import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Button
} from '@mui/material';
import React from 'react';
import { FinalFormType } from './types.d';

const FinalForm: React.FC<FinalFormType> = (props) => {
  return (
    <Box component="form" noValidate m={3} mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <TextField
            name="referredBy"
            required
            fullWidth
            id="referredBy"
            helperText="Referred By"
            onChange={(e: any) => props.handleOnChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            type="date"
            name="dateRequested"
            required
            fullWidth
            id="dateRequested"
            helperText="Date Requested"
            onChange={(e: any) => props.handleOnChange(e)}
          />
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }}>
        <div>
          {props.index === props.length - 1 ? (
            <Button
              variant="contained"
              onClick={props.handleFinish}
              sx={{ mt: 1, mr: 1 }}
            >
              Finish
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={props.handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              Continue
            </Button>
          )}

          <Button
            disabled={props.index === 0}
            onClick={props.handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Back
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default FinalForm;
