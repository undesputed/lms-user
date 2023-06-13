import { Button, Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import StepperComponent from './StepperComponent';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { useAppDispatch, useAppSelector } from 'src/actions/hooks';
import { fetchAllSubCategory } from 'src/reducers/subCategory/subCategoryReducer';
import { getToken } from 'src/reducers/auth/receptionistAuthReducer';
import { createBasicInfo } from 'src/reducers/basicInfo/basicInfoReducer';
import { createUserRequest } from 'src/reducers/requestForm/requestFormReducer';
import { createLabTest } from 'src/reducers/requestFormLabTest/requestFormLabTestReducer';
import { useNavigate } from 'react-router';
import { fetchAllCategory } from 'src/reducers/category/categoryReducer';

const AddNewRequest = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [basicStatus, setBasicStatus] = React.useState<boolean>(false);
  const [requestFormStatus, setRequestFormStatus] =
    React.useState<boolean>(false);
  const [labTestStatus, setLabTestStatus] = React.useState<boolean>(false);
  const reduxDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectSubCat, setSelectedSubCat] = React.useState<number[]>([]);

  const handleFinish = async () => {
    const userData = reduxDispatch(getToken);

    const basicInfo = {
      name: state.name,
      dateOfVisit: new Date(state.dateOfVisit).toISOString(),
      phone: state.phone,
      birthday: new Date(state.birthday).toISOString(),
      gender: state.gender,
      address: state.address,
      companyName: state.companyName,
      others: state.others,
      referredBy: state.referredBy,
      dateRequested: new Date(state.dateRequested).toISOString(),
      status: 1,
      authBy: userData.userId,
      created_at: new Date(),
      updated_at: null
    };

    try {
      const response = await reduxDispatch(createBasicInfo(basicInfo));
      setBasicStatus(true);
      createRequestForm(response.payload[0].id, userData.userId);
    } catch (err) {
      console.error(err);
    }

    const labTestForm = {
      request_form_id: 1,
      sub_category_id: 1,
      status: 1,
      authBy: userData.userId,
      created_at: new Date().toISOString(),
      updated_at: null
    };
  };

  const createRequestForm = async (basic_info_id: number, userId: number) => {
    try {
      const requestForm = {
        basic_info_id: basic_info_id,
        user_id: 0,
        dateOfVisit: new Date(state.dateOfVisit).toISOString(),
        status: 1,
        authBy: userId,
        created_at: new Date(),
        updated_at: null
      };

      const res = await reduxDispatch(createUserRequest(requestForm));
      setRequestFormStatus(true);
      createLabTestForm(res.payload[0].id, userId);
    } catch (err) {
      console.error(err);
    }
  };

  const createLabTestForm = (request_form_id: number, userId: number) => {
    try {
      selectSubCat?.map(async (item) => {
        const labTestData = {
          request_form_id: request_form_id,
          sub_category_id: item,
          status: 1,
          authBy: userId,
          created_at: new Date(),
          updated_at: null
        };

        await reduxDispatch(createLabTest(labTestData));
      });
      setLabTestStatus(true);
      final();
    } catch (err) {
      console.error(err);
    }
  };

  const final = () => {
    navigate('/receptionist/request_management');
  };

  const onDelete = (event: any, sub_category_id: number) => {
    setSelectedSubCat((prevSelectedSubCat) =>
      prevSelectedSubCat.filter((d) => d !== sub_category_id)
    );
  };

  const handleSelectCat = (event: any, sub_category_id: number) => {
    const checkSubCat = selectSubCat?.find((d) => d === sub_category_id);

    if (event.target.checked) {
      if (checkSubCat) {
        return;
      } else {
        setSelectedSubCat((prevSelectedSubCat) => [
          ...prevSelectedSubCat,
          sub_category_id
        ]);
      }
    } else {
      if (checkSubCat) {
        setSelectedSubCat((prevSelectedSubCat) =>
          prevSelectedSubCat.filter((d) => d !== sub_category_id)
        );
      }
    }
  };

  const handleAddLabTest = () => {
    console.log(selectSubCat);
  };

  const handleSubcategoryChange = (event: any, selectedOptions: any) => {
    // if (event.target.checked) {
    //   setSelectedSubCat((prevSelectedSubCat) => [
    //     ...prevSelectedSubCat,
    //     selectedOptions
    //   ]);
    // } else {
    //   setSelectedSubCat((prevSelectedSubCat) =>
    //     prevSelectedSubCat.filter((test) => test.id !== selectedOptions.id)
    //   );
    // }
    dispatch({
      type: 'setSelectedCategories',
      payload: selectedOptions
    });
  };

  const handleOnChange = async (e: any) => {
    const { value, name } = e.target;
    switch (name) {
      case 'name':
        dispatch({
          type: 'setName',
          payload: value
        });
        break;
      case 'dateOfVisit':
        dispatch({
          type: 'setDateOfVisit',
          payload: new Date(value)
        });
        break;
      case 'phone':
        dispatch({
          type: 'setPhone',
          payload: value
        });
        break;
      case 'birthday':
        dispatch({
          type: 'setBirthday',
          payload: new Date(value)
        });
        break;
      case 'gender':
        dispatch({
          type: 'setGender',
          payload: value
        });
        break;
      case 'address':
        dispatch({
          type: 'setAddress',
          payload: value
        });
        break;
      case 'companyName':
        dispatch({
          type: 'setCompanyName',
          payload: value
        });
        break;
      case 'others':
        dispatch({
          type: 'setOthers',
          payload: value
        });
        break;
      case 'referredBy':
        dispatch({
          type: 'setReferred',
          payload: value
        });
        break;
      case 'dateRequested':
        dispatch({
          type: 'setDateRequested',
          payload: new Date(value)
        });
        break;
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await reduxDispatch(fetchAllCategory());
      dispatch({
        type: 'setCategory',
        payload: res.payload
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const subCat = await reduxDispatch(fetchAllSubCategory());

      dispatch({
        type: 'setSubCategory',
        payload: subCat.payload
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchSubCategory();
    fetchCategory();
  }, []);

  return (
    <>
      <Helmet>
        <title>Add New Request - Form</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
            <Paper elevation={3} sx={{ p: 5 }}>
              <StepperComponent
                handleOnChange={handleOnChange}
                subCategory={state.subCategory}
                handleFinish={handleFinish}
                handleSubcategoryChange={handleSubcategoryChange}
                category={state.category}
                handleSelectCat={handleSelectCat}
                handleSubmit={handleAddLabTest}
                selected={selectSubCat}
                onDelete={onDelete}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AddNewRequest;
