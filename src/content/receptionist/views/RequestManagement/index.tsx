import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import PatientListTable from './PatientListTable';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'src/actions/hooks';
import { getToken } from 'src/reducers/auth/authReducer';
import { fetchAllPendingRequest } from 'src/reducers/requestForm/requestFormReducer';
import { requestState } from './types.d';

const RequestManagement = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const navigate = useNavigate();
  const reduxDispatch = useAppDispatch();
  const userData = reduxDispatch(getToken);

  const onClickViewRequest = (request_form_id: number) => {
    console.log(request_form_id);
    // navigate('/receptionist/add_lab_test_request_form');
  };

  const addRequest = () => {
    navigate('/receptionist/add_lab_test_request_form');
  };

  const fetchPendingRequest = async () => {
    try {
      const res = await reduxDispatch(fetchAllPendingRequest());
      const payload = res.payload as requestState[];
      dispatch({
        type: 'setRequest',
        payload: payload
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchPendingRequest();
  }, []);

  return (
    <>
      <Helmet>
        <title>Request Management</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader onClick={addRequest} />
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
            <PatientListTable
              request={state.request}
              onClickViewRequest={onClickViewRequest}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default RequestManagement;
