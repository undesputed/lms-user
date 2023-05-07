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
import { Helmet } from 'react-helmet-async';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'src/assets/image/logo/Logo.png';
import { useDispatch } from 'react-redux';
import { AUTH, GOOGLEAUTH } from 'src/actions/constants';
import { initialState } from './initialState';
import { reducer } from './reducer';
import * as api from 'src/api/apiTest';
import { LoadingButton } from '@mui/lab';
import { Backdrop, CircularProgress } from '@mui/material';

const theme = createTheme();

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    if (state.email && state.password) {
      try {
        const { data } = await api.receptionistAuth(state);
        if (data) {
          dispatch({
            type: 'loginSuccess',
            payload: 'Login Successfully'
          });
          setLoading(false);
          localStorage.setItem('profile', JSON.stringify({data}));
          navigate('/receptionist/dashboard');
        }
      } catch (error) {
        console.error(error);
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
            Receptionist Login
          </Typography>
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
            {loading && loading ? (
              <>
                <Backdrop
                  sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                  }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <LoadingButton
                  loading
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  loadingIndicator="Loading…"
                  variant="outlined"
                >
                  Fetch data
                </LoadingButton>
              </>
            ) : (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={state.isButtonDisabled}
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
