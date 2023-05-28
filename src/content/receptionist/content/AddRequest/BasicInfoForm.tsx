import React from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Button,
  Typography
} from '@mui/material';
import { BasicInfoProps } from './types.d';
import { min } from 'date-fns';

const BasicInformationForm: React.FC<BasicInfoProps> = (props) => {
  function getCurrentDate() {
    const today = new Date();
    let month = (today.getMonth() + 1).toString(); // January is 0, so we add 1
    let day = today.getDate().toString();

    // Add leading zero if month/day is a single digit
    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }

    return `${today.getFullYear()}-${month}-${day}`;
  }
  return (
    <>
      <Box component="form" noValidate m={3} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} textAlign={'center'}>
            <Typography variant="h3" gutterBottom>
              Basic Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              helperText="Full Name"
              label="Full Name"
              onChange={(e: any) => props.handleOnChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              name="dateOfVisit"
              required
              fullWidth
              id="dateOfVisit"
              helperText="Date Of Visit"
              defaultValue={new Date().toISOString().split('T')[0]}
              inputProps={{
                min: new Date().toISOString().split('T')[0]
              }}
              onChange={(e: any) => props.handleOnChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="phone"
              required
              fullWidth
              id="phone"
              helperText="Phone Number"
              label="Phone Number"
              onChange={(e: any) => props.handleOnChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              name="birthday"
              required
              fullWidth
              id="birthday"
              helperText="Birthday"
              defaultValue={new Date('2000-01-01').toISOString().split('T')[0]}
              onChange={(e: any) => props.handleOnChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="gender"
                onChange={(e: any) => props.handleOnChange(e)}
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
              label="Address"
              name="address"
              onChange={(e: any) => props.handleOnChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              id="outlined-select-currency"
              helperText="Company Name"
              style={{
                width: '100%'
              }}
              label="Company Name"
              name="companyName"
              onChange={(e: any) => props.handleOnChange(e)}
            />
          </Grid>
        </Grid>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={props.handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              {props.index === props.length - 1 ? 'Finish' : 'Continue'}
            </Button>
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
    </>
  );
};

export default BasicInformationForm;
