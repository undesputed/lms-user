import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaGoogle, FaFacebookSquare, FaTwitter } from 'react-icons/fa';
import logo from 'src/assets/image/logo/Logo.png';
import {
  FormControl,
  FormLabel,
  MenuItem,
  RadioGroup,
  Stack
} from '@mui/material';
import moment from 'moment';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { GoogleLogin } from '@react-oauth/google';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ec_care_laboratory.ph.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const gender = [
  {
    value: 1,
    label: 'male'
  },
  {
    value: 2,
    label: 'female'
  },
  {
    value: 3,
    label: 'other'
  }
];

const theme = createTheme();

export default function SignUp() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);
  };

  const onChangeFirstName: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setFirstName',
      payload: event.target.value
    });
  };

  const onChangeLastName: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setLastName',
      payload: event.target.value
    });
  };

  const onChangePhone: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: 'setPhone',
      payload: event.target.value
    });
  };

  const onChangeAddress: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setAddress',
      payload: event.target.value
    });
  };
  const onChangeGender: any = (event) => {
    dispatch({
      type: 'setGender',
      payload: event.target.value
    });
  };
  const onChangeBirthday: any = (event) => {
    dispatch({
      type: 'setBirthDate',
      payload: event.target.value
    });
  };
  const onChangeEmail: any = (event) => {
    dispatch({
      type: 'setEmail',
      payload: event.target.value
    });
  };
  const onChangePassword: any = (event) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value
    });
  };
  const onChangeConfirmPass: any = (event) => {
    dispatch({
      type: 'setConfirmPassword',
      payload: event.target.value
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar
            sx={{ bgcolor: '', width: 100, height: 100 }}
            variant="rounded"
            src={logo}
            alt="EC-Care Medical Laboratory"
          ></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e: any) => onChangeFirstName(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e: any) => onChangeLastName(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e: any) => onChangePhone(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="address"
                  name="address"
                  autoComplete="address"
                  onChange={(e: any) => onChangeAddress(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="male"
                  helperText="Please select your gender"
                  onChange={(e: any) => onChangeGender(e)}
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  id="outlined-select-currency"
                  helperText="Enter Birth Date"
                  style={{
                    width: '100%'
                  }}
                  onChange={(e: any) => onChangeBirthday(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e: any) => onChangeEmail(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e: any) => onChangePassword(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Re-Type Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e: any) => onChangeConfirmPass(e)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end" mt={2}>
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  {'Already have an account? Sign in'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
