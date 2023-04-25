import React, { useState, useReducer, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FaGoogle, FaFacebookSquare, FaTwitter } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from 'src/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'src/assets/image/logo/Logo.png';
import * as api from 'src/api/api';
import { reducer } from './reducer';
import { initialState } from './initialState';
import axios from 'axios';
import {
  GoogleLogin,
  GoogleLoginProps,
  useGoogleLogin
} from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import '../../../../../assets/scss/main.css';
import { useDispatch } from 'react-redux';
import { AUTH, GOOGLEAUTH } from 'src/actions/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducers';

const theme = createTheme();

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const authDispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.email, state.password]);

  const handleLogin = async () => {
    if (state.email && state.password) {
      try {
        const { data } = await api.login(state);
        authDispatch({ type: AUTH, data });
        dispatch({
          type: 'loginSuccess',
          payload: 'Login Successfully'
        });
        navigate('/patient/dashboard');
      } catch (error) {
        dispatch({
          type: 'loginFailed',
          payload: 'Login Failed'
        });

        dispatch({
          type: 'setIsError',
          payload: true
        });
      }
    } else {
      dispatch({
        type: 'loginFailed',
        payload: 'Incorrect username or password'
      });
    }
  };

  const googleLogin = async (response) => {
    var userObject: any = jwtDecode(response.credential);

    try {
      const { data } = await api.googleAuth(userObject);
      authDispatch({ type: GOOGLEAUTH, data });
      dispatch({
        type: 'loginSuccess',
        payload: 'Login Successfully'
      });
      navigate('/patient/dashboard');
    } catch (error) {
      dispatch({
        type: 'setErrorText',
        payload: true,
        message: 'Email not found!!'
      });
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      return state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setEmail',
      payload: event.target.value
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value
    });
  };

  React.useEffect(() => {
    if (localStorage.length > 0) {
      navigate('/patient/dashboard');
    }
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>EC-Care Login Page</title>
      </Helmet>
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
            sx={{ m: 1, bgcolor: '', width: 120, height: 120 }}
            variant="rounded"
            src={logo}
            alt="EC-Care Medical Laboratory"
          ></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {state.isError ? (
            <Box mt={2}>
              <Alert severity="error">
                Invalid Credentials! Please Try again!!
              </Alert>
            </Box>
          ) : null}
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              error={state.isError}
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="email@gmail.com"
              name="email"
              autoFocus
            />
            <TextField
              error={state.isError}
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={state.isButtonDisabled}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button fullWidth sx={{ mb: 2 }}>
              <GoogleLogin
                type="standard"
                theme="filled_blue"
                text="continue_with"
                shape="square"
                width="200"
                locale="en"
                cancel_on_tap_outside={true}
                onSuccess={googleLogin}
                onError={() => errorMessage}
              />
            </Button>
            <Grid container mt={2} mb={10}>
              <Grid item xs>
                <Link to="#">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/auth/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
