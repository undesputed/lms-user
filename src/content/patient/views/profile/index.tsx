import {
  Container,
  Box,
  Card,
  Typography,
  Divider,
  Button,
  Grid,
  TextField
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
import CustomSnackBar from '../../components/Snackbar';
import {
  createUserRequest,
  fetchAllUserRequest,
  selectAllRequestForm,
  selectRequestFormsWithStatusOne
} from 'src/reducers/requestForm/requestFormReducer';
import ModalComponent from '../../components/Modal';
import { RequestForm } from './types.d';
import { createLabTest } from 'src/reducers/requestFormLabTest/requestFormLabTestReducer';
import { createNewNotification } from 'src/reducers/receptionistNotification/receptionistNotificationReducer';

const PatientProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const navigate = useNavigate();
  const reduxDispatch = useAppDispatch();
  const userData = reduxDispatch(getToken);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const requestForm = useAppSelector(selectAllRequestForm);
  const requestFormByStatus = useAppSelector(selectRequestFormsWithStatusOne);

  const submitRequest = async () => {
    try {
      const data = {
        user_id: userData.userId,
        dateOfVisit: new Date(state.dateOfVisit),
        status: 1,
        authBy: userData.userId,
        created_at: new Date(),
        updated_at: null
      };
      const createReq = await reduxDispatch(createUserRequest(data));
      if (createReq.type === 'requestForm/createUserRequest/fulfilled') {
        const labTestData = {
          request_form_id: createReq.payload[0].id,
          sub_category_id: 0,
          status: 1,
          authBy: userData.userId,
          created_at: new Date(),
          updated_at: null
        };

        const notifData = {
          receptionist_id: 1,
          patient_request_id: createReq.payload[0].id,
          message: 'New Lab Test Request Form',
          is_read: 0,
          created_at: new Date(),
          updated_at: null
        };
        const createLabTestForm = await reduxDispatch(
          createLabTest(labTestData)
        );
        const createNotification = await reduxDispatch(
          createNewNotification(notifData)
        );
        console.log(createNotification);
        if (
          createLabTestForm.type ===
            'requestFormLabTest/createLabTest/fulfilled' &&
          createNotification.type ===
            'receptionistNotification/createNewNotification/fulfilled'
        ) {
          setTimeout(() => {
            dispatch({
              type: 'setSnackBarStatus',
              payload: true
            });
          }, 500);
          dispatch({
            type: 'setOpenModal',
            payload: false
          });
        }
      } else {
        alert('You Have a Pending Request');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalClose = () => {
    dispatch({
      type: 'setOpenModal',
      payload: false
    });
  };

  const handleClose = () => {
    dispatch({
      type: 'setSnackBarStatus',
      payload: false
    });
  };

  const onSendARequest = (event: any) => {
    const pending = state.request?.filter((d) => d.status === 1);

    if (pending && pending.length !== 0) {
      alert('You have a Pending request!!');
    } else {
      dispatch({
        type: 'setOpenModal',
        payload: true
      });
    }
  };

  const fetchRequest = async () => {
    try {
      const userRequest = await reduxDispatch(
        fetchAllUserRequest(userData.userId)
      );
      const payload = userRequest?.payload as RequestForm[];
      if (payload) {
        dispatch({
          type: 'setRequest',
          payload: payload
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

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
    fetchRequest();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Header />
      <ModalComponent
        open={state.modalStatus}
        handleClose={handleModalClose}
        title="Date of Visit"
        handleSubmit={submitRequest}
      >
        <Box m={3} maxWidth={500}>
          <TextField
            type="date"
            name="dateOfVisit"
            required
            fullWidth
            id="dateOfVisit"
            defaultValue={formattedDate}
            helperText="Enter Date of Visit"
            inputProps={{
              min: formattedDate
            }}
            onChange={(e) =>
              dispatch({
                type: 'setDateOfVisit',
                payload: new Date(e.target.value)
              })
            }
          />
        </Box>
      </ModalComponent>
      <CustomSnackBar
        open={state.snackBarStatus}
        onClose={handleClose}
        severity="success"
        autoHideDuration={3000}
      >
        Request Submitted Successfully!!
      </CustomSnackBar>
      <Container component="main" maxWidth="lg">
        <Grid item xs={12} md={12}>
          <ProfileCover
            user={state?.profile}
            handleOnclick={(e: any) => onSendARequest(e)}
          />
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
