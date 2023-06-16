import React from 'react';
import { AccountBalance } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { useAppDispatch } from 'src/actions/hooks';
import { useNavigate } from 'react-router';
import { fetchAllCategory } from 'src/reducers/category/categoryReducer';
import { fetchAllSubCategory } from 'src/reducers/subCategory/subCategoryReducer';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { sub } from 'date-fns';
import Modal from './modal';

const CategoryManagement = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const reduxDispatch = useAppDispatch();
  const navigate = useNavigate();

  const onEditSubCategory = (sub_category_id: number) => {
    dispatch({
      type: 'setOpenModal',
      payload: true
    });
    dispatch({
      type: 'setType',
      payload: 'Edit Sub Category'
    });
    console.log(sub_category_id);
  };

  const onEditCategory = (category_id: number) => {
    dispatch({
      type: 'setOpenModal',
      payload: true
    });
    dispatch({
      type: 'setType',
      payload: 'Edit Category'
    });
    console.log(category_id);
  };

  const onAddNewSubCategory = () => {
    dispatch({
      type: 'setOpenModal',
      payload: true
    });
    dispatch({
      type: 'setType',
      payload: 'Add New Sub Category'
    });
  };

  const handleOnClose = () => {
    dispatch({
      type: 'setOpenModal',
      payload: false
    });
    dispatch({
      type: 'setType',
      payload: ''
    });
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
        <title>Receptionist Dashboard</title>
      </Helmet>
      <Modal
        open={state.openModal}
        type={state.type}
        title={state.type}
        handleClose={handleOnClose}
      >
        {(function () {
          if (state.type === 'Edit Sub Category') {
            return (
              <>
                <Box
                  component="form"
                  noValidate
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection={'column'}
                >
                  <TextField
                    name="subCategory"
                    required
                    fullWidth
                    id="subCategory"
                    label="New Sub-Category Name"
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button>Cancel</Button>
                    <Button variant="contained">Update</Button>
                  </Box>
                </Box>
              </>
            );
          } else if (state.type === 'Edit Category') {
            return (
              <>
                <Box
                  component="form"
                  noValidate
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection={'column'}
                >
                  <TextField
                    name="category"
                    required
                    fullWidth
                    id="category"
                    label="New Category Name"
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button>Cancel</Button>
                    <Button variant="contained">Update</Button>
                  </Box>
                </Box>
              </>
            );
          } else {
            return (
              <>
                <Box
                  component="form"
                  noValidate
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection={'column'}
                >
                  <TextField
                    name="newSubCategory"
                    required
                    fullWidth
                    id="newSubCategory"
                    label="New Sub-Category Name"
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button>Cancel</Button>
                    <Button variant="contained">Update</Button>
                  </Box>
                </Box>
              </>
            );
          }
        })()}
      </Modal>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Card
              sx={{
                maxWidth: '100%',
                width: '100%',
                mt: 4,
                mb: 4
              }}
            >
              <CardHeader title="Laboratory Categories and Sub Categories" />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'space-between'
                  }}
                  m={2}
                >
                  {state.category?.map((data, index) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={index}
                        sx={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <FormGroup
                          sx={{
                            textTransform: 'uppercase',
                            mb: 1
                          }}
                        >
                          <FormControlLabel
                            label={data.category_name}
                            control={
                              <IconButton
                                aria-label="edit"
                                size="small"
                                color="info"
                                onClick={() => onEditCategory(data.id)}
                              >
                                <ModeEditOutlineIcon />
                              </IconButton>
                            }
                            sx={{
                              '& .MuiFormControlLabel-label': {
                                fontWeight: 'bold',
                                fontSize: '20px'
                              }
                            }}
                          />
                          <Divider variant="middle" />
                        </FormGroup>
                        {state.subCategory
                          .filter((subData) => subData.category_id === data.id)
                          .map((subCat, i) => (
                            <FormGroup key={i}>
                              <FormControlLabel
                                control={
                                  <IconButton
                                    aria-label="edit"
                                    size="small"
                                    onClick={() => onEditSubCategory(subCat.id)}
                                  >
                                    <ModeEditOutlineIcon />
                                  </IconButton>
                                }
                                label={subCat.sub_category_name}
                              />
                            </FormGroup>
                          ))}
                        <Box
                          border={'ActiveBorder'}
                          mt={2}
                          mb={2}
                          sx={{
                            textAlign: 'left'
                          }}
                        >
                          <IconButton
                            aria-label="add"
                            color="primary"
                            size="large"
                            onClick={() => onAddNewSubCategory}
                          >
                            <AddIcon />
                            <Typography component="h5" variant="h5" ml={1}>
                              Add new Sub Category
                            </Typography>
                          </IconButton>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CategoryManagement;
