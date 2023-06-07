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
import {
  fetchAllBasicInfo,
  fetchAllPendingRequest
} from 'src/reducers/requestForm/requestFormReducer';
import { requestState } from './types.d';
import { basicInfoFormResponse } from 'src/reducers/requestForm/requestForm';
import { updateCompleteStatus } from 'src/reducers/requestFormLabTest/requestFormLabTestReducer';

const RequestManagement = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const navigate = useNavigate();
  const reduxDispatch = useAppDispatch();
  const userData = reduxDispatch(getToken);

  const onClickApproved = async (request_form_id: number) => {
    try {
      const res = await reduxDispatch(updateCompleteStatus(request_form_id));
      if (res.type === 'requestFormLabTest/completeLabTest/fulfilled') {
        alert('Request Completed!!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickViewRequest = (request_form_id: number) => {
    navigate(`/receptionist/view_request?form_id=${request_form_id}`);
  };

  const addRequest = () => {
    navigate('/receptionist/add_new_request');
  };

  const fetchPendingRequest = async () => {
    try {
      const res = await reduxDispatch(fetchAllBasicInfo());
      const payload = res.payload as basicInfoFormResponse[];

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
              onClickApproved={onClickApproved}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default RequestManagement;
