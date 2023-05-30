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
  Alert,
  AlertTitle,
  Backdrop,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  RadioGroup,
  Snackbar,
  Stack
} from '@mui/material';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from 'src/actions/hooks';
import { registerAsync } from 'src/reducers/auth/authReducer';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      mb={5}
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
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const reduxDispatch = useAppDispatch();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({
      type: 'setLoginSuccess',
      payload: true
    });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        EXIT
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    dispatch({
      type: 'setAge',
      payload: age
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: 'setLoading',
      payload: true
    });
    
    if (
      !state.firstName ||
      !state.lastName ||
      !state.phone ||
      !state.address ||
      state.sex === 0 ||
      !state.email ||
      !state.password ||
      !state.confirmPassword
    ) {
      dispatch({
        type: 'setError',
        payload: true
      });
      return;
    }

    if (new Date(state.birthday).getDate() === new Date().getDate()) {
      dispatch({
        type: 'setError',
        payload: true
      });
      dispatch({
        type: 'setErrorMessage',
        payload: 'Birthday is required!!'
      });
      return;
    }

    if (state.password !== state.confirmPassword) {
      dispatch({
        type: 'setError',
        payload: true
      });
      dispatch({
        type: 'setErrorMessage',
        payload: 'Password Does not Match'
      });
      return;
    }

    try {
      const response = await reduxDispatch(registerAsync(state));
      console.log(response);
      if (response.type === 'auth/register/rejected') {
        dispatch({
          type: 'setEmailExists',
          payload: true
        });
        dispatch({
          type: 'setError',
          payload: true
        });
        dispatch({
          type: 'setEmailExistsMessage',
          payload: 'Email Already In Use'
        });
        return;
      }
      dispatch({
        type: 'setLoginSuccess',
        payload: true
      });
      dispatch({
        type: 'setError',
        payload: false
      });
      dispatch({
        type: 'setErrorMessage',
        payload: ''
      });
      dispatch({
        type: 'setLoading',
        payload: false
      });
      navigate('/auth/login');
    } catch (err) {
      dispatch({
        type: 'setError',
        payload: true
      });
      dispatch({
        type: 'setErrorMessage',
        payload: 'Password Does not Match'
      });
    }
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
    calculateAge(event.target.value);
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

  React.useEffect(() => {
    calculateAge(state.birthday);
  }, []);

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
            Patient Sign up
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
                  error={!state.firstName && state.error ? true : false}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={state.firstName}
                  autoFocus
                  onChange={(e: any) => onChangeFirstName(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!state.lastName && state.error ? true : false}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={state.lastName}
                  autoComplete="family-name"
                  onChange={(e: any) => onChangeLastName(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!state.phone && state.error ? true : false}
                  required
                  fullWidth
                  type="tel"
                  id="phone"
                  inputProps={{ pattern: '[0-9]*' }}
                  label="Phone Number"
                  name="phone"
                  value={state.phone}
                  autoComplete="phone"
                  onChange={(e: any) => onChangePhone(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!state.address && state.error ? true : false}
                  required
                  fullWidth
                  id="address"
                  label="address"
                  name="address"
                  value={state.address}
                  autoComplete="address"
                  onChange={(e: any) => onChangeAddress(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={!state.sex && state.error ? true : false}
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="male"
                  value={state.sex}
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
                  error={!state.birthday && state.error ? true : false}
                  type="date"
                  id="outlined-select-currency"
                  helperText="Enter Birth Date"
                  style={{
                    width: '100%'
                  }}
                  value={state.birthday}
                  onChange={(e: any) => onChangeBirthday(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!state.email && state.error ? true : false}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  value={state.email}
                  autoComplete="email"
                  onChange={(e: any) => onChangeEmail(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!state.password && state.error ? true : false}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={(e: any) => onChangePassword(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    state.confirmPassword !== state.password && state.error
                      ? true
                      : false
                  }
                  required
                  fullWidth
                  name="confirmPass"
                  label="Re-Type Password"
                  type="password"
                  value={state.confirmPassword}
                  id="confirmPass"
                  onChange={(e: any) => onChangeConfirmPass(e)}
                />
              </Grid>
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
            {state.error ? (
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    All Fields are required — <strong>check it out!</strong>
                  </Alert>
                  {state.errorMessage ? (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      <strong>{state.errorMessage}</strong>
                    </Alert>
                  ) : null}
                </Grid>
              </Grid>
            ) : null}
            {state.emailExists ? (
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                  <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    {state.emailExistsMessage} <strong>{state.email}</strong>
                  </Alert>
                </Grid>
              </Grid>
            ) : null}
            {state.loading ? (
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={state.loading}
                onClick={() => {
                  dispatch({ type: 'setLoading', payload: false });
                }}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : null}
            {state.loginSuccess ? (
              <Snackbar
                open={state.loginSuccess}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Login Success"
                action={action}
              />
            ) : null}
          </Box>
        </Box>
        <Copyright sx={{ mt: 3 }} />
      </Container>
    </ThemeProvider>
  );
}
