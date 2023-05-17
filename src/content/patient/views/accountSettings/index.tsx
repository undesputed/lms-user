import React, { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import EditProfileTab from './EditProfileTab';
import NotificationsTab from './NotificationsTab';
import SecurityTab from './SecurityTab';
import Header from '../../components/Header';
import { TabsWrapper } from './style';
import { useNavigate } from 'react-router';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { useAppDispatch, useAppSelector } from 'src/actions/hooks';
import { getToken } from 'src/reducers/auth/authReducer';
import {
  fetchUserById,
  selectUserById,
  updateEmailById,
  updateProfileById
} from 'src/reducers/user/userReducer';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import SnackBarComponent from './SnackBar';

function PatientAccountSettings() {
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const reduxDispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState<string>('edit_profile');

  const handleSnackBarClose = () => {
    dispatch({
      type: 'setOnUpdate',
      payload: false
    });
  };

  const handleEmailOpen = () => {
    dispatch({
      type: 'setEmailOpen',
      payload: true
    });
  };

  const handleEmailClose = () => {
    dispatch({
      type: 'setEmailOpen',
      payload: false
    });
  };

  const handleClose = () => {
    dispatch({
      type: 'setProfileOpen',
      payload: false
    });
  };

  const handleOpen = () => {
    dispatch({
      type: 'setProfileOpen',
      payload: true
    });
  };

  const tabs = [
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Passwords/Security' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const handleUpdateEmail = async (email: string) => {
    try {
      const userData = reduxDispatch(getToken);
      const existingUser = await reduxDispatch(fetchUserById(userData.userId));
      const data = {
        email:
          email === ''
            ? existingUser.payload?.email
            : email || existingUser.payload?.email
      };
      reduxDispatch(updateEmailById({ id: userData.userId, userData: data }));

      dispatch({
        type: 'setProfileOpen',
        payload: false
      });
      dispatch({
        type: 'setEmailOpen',
        payload: false
      });
      dispatch({
        type: 'setOnUpdate',
        payload: true
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateDetails = async (
    firstName: string,
    middleName: string,
    lastName: string,
    birthday: string,
    phone: string,
    age: number,
    gender: number,
    address: string
  ) => {
    try {
      const userData = reduxDispatch(getToken);
      const existingUser = await reduxDispatch(fetchUserById(userData.userId));
      const data = {
        firstName:
          firstName === ''
            ? existingUser.payload?.firstName
            : firstName || existingUser.payload?.firstName,
        middleName:
          middleName === ''
            ? existingUser.payload?.middleName
            : middleName || existingUser.payload?.middleName,
        lastName:
          lastName === ''
            ? existingUser.payload?.lastName
            : lastName || existingUser.payload?.lastName,
        birthday:
          birthday === ''
            ? existingUser.payload?.birthday
            : birthday || existingUser.payload?.birthday,
        phone:
          phone === ''
            ? existingUser.payload?.phone
            : phone || existingUser.payload?.phone,
        age:
          age === 0
            ? existingUser.payload?.age
            : age || existingUser.payload?.age,
        sex:
          gender === 0
            ? existingUser.payload?.sex
            : gender || existingUser.payload?.sex,
        address:
          address === ''
            ? existingUser.payload?.address
            : address || existingUser.payload?.address
      };
      reduxDispatch(updateProfileById({ id: userData.userId, userData: data }));
      dispatch({
        type: 'setProfile',
        payload: { ...state.profile, ...data }
      });

      dispatch({
        type: 'setProfileOpen',
        payload: false
      });
      dispatch({
        type: 'setEmailOpen',
        payload: false
      });
      dispatch({
        type: 'setOnUpdate',
        payload: true
      });
    } catch (error) {
      console.log(error);
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
  }, []);
  return (
    <>
      <Helmet>
        <title>User Settings - Applications</title>
      </Helmet>
      <Header />
      <PageTitleWrapper>
        <PageHeader user={state.profile} />
      </PageTitleWrapper>
      <SnackBarComponent
        isOpen={state.onUpdate}
        handleClose={handleSnackBarClose}
      >
        Update Successful!
      </SnackBarComponent>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'edit_profile' && (
              <EditProfileTab
                handleEmailOpen={handleEmailOpen}
                handleIsOpen={handleOpen}
                isOpen={state.profileOpen}
                emailOpen={state.emailOpen}
                user={state.profile}
                handleOnClose={handleClose}
                handleEmailClose={handleEmailClose}
                handleUpdateDetails={handleUpdateDetails}
                handleUpdateEmail={handleUpdateEmail}
              />
            )}
            {currentTab === 'notifications' && <NotificationsTab />}
            {currentTab === 'security' && <SecurityTab />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default PatientAccountSettings;
