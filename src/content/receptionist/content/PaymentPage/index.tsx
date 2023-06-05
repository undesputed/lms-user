import React from 'react';
import { Helmet } from 'react-helmet-async';
import Options from './options';
import { Box, Button, Container, Grid, Paper } from '@mui/material';
import Footer from 'src/components/Footer';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/actions/hooks';
import { fetchAllCategory } from 'src/reducers/category/categoryReducer';
import { fetchLabTestByRequestFormId } from 'src/reducers/requestFormLabTest/requestFormLabTestReducer';
import { SubCategory } from './types.d';
import { getToken } from 'src/reducers/auth/authReducer';
import { insertNewPayment } from 'src/reducers/payment/paymentReducer';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('form_id');
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const reduxDispatch = useAppDispatch();

  const onSubmit = async (type: string, serialNumber: string) => {
    if (type === 'gcash') {
      if (serialNumber === '') {
        alert('Please Input Serial Number!');
        return;
      }
    }

    try {
      const userData = reduxDispatch(getToken());
      const paymentData = {
        request_form_id: id,
        payment_type: type,
        serial_number: serialNumber,
        payment_date: new Date().toISOString(),
        status: 1,
        authBy: userData.userId
      };
      const res = await reduxDispatch(insertNewPayment(paymentData));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await reduxDispatch(fetchAllCategory());
      if (res.type === 'category/fetchAll/fulfilled') {
        dispatch({
          type: 'setCategory',
          payload: res.payload
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await reduxDispatch(
        fetchLabTestByRequestFormId(parseInt(id))
      );
      if (
        response.type ===
        'requestFormLabTest/fetchAllLabTestByRequestId/fulfilled'
      ) {
        const payload = response.payload as SubCategory[];
        dispatch({
          type: 'setSubCategory',
          payload: payload
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <Helmet>
        <title>Add New Request - Form</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          display={'flex'}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Options
              subCategory={state.subCategory}
              category={state.category}
              onSubmit={onSubmit}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentPage;
