import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/actions/hooks';
import Footer from 'src/components/Footer';
import { fetchBasicInfoByFormId } from 'src/reducers/requestForm/requestFormReducer';
import {
  createLabTest,
  deleteLabTest,
  fetchLabTestByRequestFormId
} from 'src/reducers/requestFormLabTest/requestFormLabTestReducer';
import BasicInfoComponent from './basicInformation';
import LabTestComponent from './labTest';
import ApprovalSection from './approvalSection';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { BasicInfo, LabTest } from './types.d';
import PromptModal from './promptModal';
import { editBasicInfo } from 'src/reducers/basicInfo/basicInfoReducer';
import { fetchAllCategory } from 'src/reducers/category/categoryReducer';
import { fetchAllSubCategory } from 'src/reducers/subCategory/subCategoryReducer';
import { getToken } from 'src/reducers/auth/receptionistAuthReducer';

const ViewRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('form_id');
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [selectedSubCat, setSelectedSubCat] = React.useState<number[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const reduxDispatch = useAppDispatch();

  const handleClosePrompt = () => {
    dispatch({
      type: 'setPrompt',
      payload: false
    });
  };

  const handleOnDelete = async (
    sub_category_id: number,
    sub_category_name: string
  ) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${sub_category_name}`
    );

    if (confirmDelete) {
      try {
        const deleteData = {
          request_form_id: parseInt(id),
          sub_category_id: sub_category_id
        };

        const response = await reduxDispatch(deleteLabTest(deleteData));

        if (response.type === 'requestFormLabTest/deleteLabTest/fulfilled') {
          dispatch({
            type: 'setPrompt',
            payload: true
          });

          setTimeout(() => {
            dispatch({
              type: 'setPrompt',
              payload: false
            });
          }, 2000);
          fetchLabTests();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddTest = () => {
    dispatch({
      type: 'setAddLabTest',
      payload: true
    });
  };

  const handleCloseAddTest = () => {
    dispatch({
      type: 'setAddLabTest',
      payload: false
    });
  };

  const handleClose = () => {
    setOpen(false);
    fetchBasicInfo();
  };

  const handleAddTestOnChange = (event: any, subCategoryId: number) => {
    const checkSubCat = selectedSubCat?.find((d) => d === subCategoryId);

    if (event.target.checked) {
      if (checkSubCat) {
        return;
      } else {
        setSelectedSubCat((prevSelectedSubCat) => [
          ...prevSelectedSubCat,
          subCategoryId
        ]);
      }
    } else {
      if (checkSubCat) {
        setSelectedSubCat((prevSelectedSubCat) =>
          prevSelectedSubCat.filter((d) => d !== subCategoryId)
        );
      }
    }
  };

  const handleAddingTest = () => {
    try {
      const userData = reduxDispatch(getToken);
      selectedSubCat?.map(async (item) => {
        const labTestData = {
          request_form_id: parseInt(id),
          sub_category_id: item,
          status: 1,
          authBy: parseInt(userData.userId),
          created_at: new Date(),
          updated_at: null
        };

        await reduxDispatch(createLabTest(labTestData));
        window.location.reload();
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await reduxDispatch(editBasicInfo(state.basicInfo));
      if (res.type === 'basicInfo/updateBasicInfo/fulfilled') {
        dispatch({
          type: 'setPrompt',
          payload: true
        });

        setTimeout(() => {
          dispatch({
            type: 'setPrompt',
            payload: false
          });
        }, 2000);
        setOpen(false);
        fetchBasicInfo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e: any) => {
    dispatch({
      type: 'updateBasicInfo',
      name: e.target.name,
      value: e.target.value
    });
  };

  //Retrieve Basic Information from the basic_info table
  const fetchBasicInfo = async () => {
    try {
      const res = await reduxDispatch(fetchBasicInfoByFormId(parseInt(id)));
      const payload = res.payload[0] as BasicInfo;

      dispatch({
        type: 'setBasicInfo',
        payload: payload
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Retrieve lab Test based on the request form id
  const fetchLabTests = async () => {
    try {
      const response = await reduxDispatch(
        fetchLabTestByRequestFormId(parseInt(id))
      );
      const payload = response?.payload as LabTest[];
      dispatch({
        type: 'setLabTest',
        payload: payload
      });
    } catch (err) {
      console.error(err);
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
    fetchBasicInfo();
    fetchLabTests();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <Helmet>
        <title>Add New Request - Form</title>
      </Helmet>
      <PromptModal open={state.promptModal} handleClose={handleClosePrompt} />
      <Box maxWidth="xl" m={3}>
        <BasicInfoComponent
          basicInfo={state.basicInfo}
          onChange={onChange}
          handleUpdate={handleUpdate}
          handleClose={handleClose}
          open={open}
        />
        <LabTestComponent
          labTest={state.labTest}
          handleAddTest={handleAddTest}
          handleOnDelete={handleOnDelete}
          handleClose={handleCloseAddTest}
          open={state.addLabTest}
          subCategory={state.subCategory}
          category={state.category}
          handleAddTestOnChange={handleAddTestOnChange}
          handleAddingTest={handleAddingTest}
        />
        <ApprovalSection />
      </Box>
      <Footer />
    </>
  );
};

export default ViewRequest;
