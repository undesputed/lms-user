import {
  Container,
  Box,
  Card,
  Typography,
  Divider,
  Button,
  Grid
} from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import Footer from 'src/components/Footer';
import Header from '../../components/Header';
import ProfileCover from './ProfileCover';
import ProfileListTable from './ProfileListTable';
import { useAppDispatch, useAppSelector } from 'src/actions/hooks';
import { getToken, selectToken } from 'src/reducers/auth/authReducer';
import { fetchUserById } from 'src/reducers/user/userReducer';
import { reducer } from './reducer';
import { initialState } from './initialState';

const PatientProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const navigate = useNavigate();
  const reduxDispatch = useAppDispatch();

  const fetchProfile = () => {
    try {
      const data = reduxDispatch(getToken);
      reduxDispatch(fetchUserById(data.userId))
        .then((res) => {
          dispatch({
            type: 'setProfile',
            payload: res.payload
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (!sessionStorage.getItem('profile')) {
      navigate('/');
    }
    fetchProfile();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Header />
      <Container component="main" maxWidth="lg">
        <Grid item xs={12} md={12}>
          <ProfileCover user={state?.profile} />
        </Grid>
        <Grid item xs={12} md={12}>
          <ProfileListTable />
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default PatientProfile;
