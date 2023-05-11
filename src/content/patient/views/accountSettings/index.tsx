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
import { useAppDispatch } from 'src/actions/hooks';
import { getToken } from 'src/reducers/auth/authReducer';
import { fetchUserById } from 'src/reducers/user/userReducer';

function PatientAccountSettings() {
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const reduxDispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState<string>('edit_profile');

  const tabs = [
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Passwords/Security' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const handleUpdateDetails = () => {
    console.log(state.profile);
  };

  const handleOnChange = (event: any) => {
    const { name, value } = event.target;

    state.profile.firstName = value;
    console.log(state.profile);
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
                user={state.profile}
                handleUpdateDetails={handleUpdateDetails}
                handleOnChange={handleOnChange}
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
