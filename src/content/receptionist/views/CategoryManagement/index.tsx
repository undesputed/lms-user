import React from 'react';
import {
  AccountBalance,
  CoPresentOutlined,
  ConstructionOutlined
} from '@mui/icons-material';
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
import {
  createCat,
  fetchAllCategory,
  updateCat
} from 'src/reducers/category/categoryReducer';
import {
  createNewSubCategory,
  deleteSubCat,
  fetchAllSubCategory,
  updateSubCat
} from 'src/reducers/subCategory/subCategoryReducer';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { sub } from 'date-fns';
import Modal from './modal';
import { getToken } from 'src/reducers/auth/authReducer';

const CategoryManagement = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const reduxDispatch = useAppDispatch();
  const authUser = reduxDispatch(getToken);
  const navigate = useNavigate();

  const handleAddNewCategory = async () => {
    try {
      const data = {
        category_name: state.value,
        authBy: authUser.userId
      };

      const res = await reduxDispatch(createCat(data));
      if (res.type === 'category/create/fulfilled') {
        handleOnClose();
        fetchCategory();
        fetchSubCategory();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickUpdateSubCategory = async () => {
    try {
      const id = state.id;
      const data = {
        sub_category_name: state.value,
        price: state.price
      };

      const res = await reduxDispatch(updateSubCat({ id, credential: data }));
      if (res.type === 'subCategory/update/fulfilled') {
        handleOnClose();
        fetchSubCategory();
        fetchCategory();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickUpdateCategory = async () => {
    try {
      const id = state.id;
      const data = {
        category_name: state.value
      };

      const res = await reduxDispatch(updateCat({ id, credential: data }));
      if (res.type === 'category/update/fulfilled') {
        handleOnClose();
        fetchSubCategory();
        fetchCategory();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onOpenAddNewCat = async () => {
    dispatch({
      type: 'setOpenModal',
      payload: true
    });
    dispatch({
      type: 'setType',
      payload: 'Add Category'
    });
  };

  const onEditSubCategory = (
    sub_category_id: number,
    sub_category_name: string,
    price: number
  ) => {
    dispatch({
      type: 'setPrice',
      payload: price
    });
    dispatch({
      type: 'setValue',
      payload: sub_category_name
    });
    dispatch({
      type: 'setOpenModal',
      payload: true
    });
    dispatch({
      type: 'setType',
      payload: 'Edit Sub Category'
    });
    dispatch({
      type: 'setId',
      payload: sub_category_id
    });
  };

  const onDeleteSubCategory = async (sub_category_id: number) => {
    try {
      const result = window.confirm('Are you sure you want to delete?');
      if (result) {
        const res = await reduxDispatch(deleteSubCat(sub_category_id));
        if (res.type === 'subCategory/delete/fulfilled') {
          handleOnClose();
          fetchSubCategory();
          fetchCategory();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEditCategory = (category_id: number, category_name: string) => {
    dispatch({
      type: 'setOpenModal',
      payload: true
    });
    dispatch({
      type: 'setType',
      payload: 'Edit Category'
    });
    dispatch({
      type: 'setId',
      payload: category_id
    });
    dispatch({
      type: 'setValue',
      payload: category_name
    });
  };

  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setValue',
      payload: event.target.value
    });
  };

  const handlePriceChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const inputValue = event.target.value;
    const numberValue = parseFloat(inputValue);
    if (numberValue) {
      dispatch({
        type: 'setPrice',
        payload: numberValue
      });
    } else {
      alert('Pice is not Valid!!');
      return;
    }
  };

  const onAddNewSubCategory = (category_id: number) => {
    dispatch({
      type: 'setId',
      payload: category_id
    });
    dispatch({
      type: 'setOpenModal',
      payload: true
    });
    dispatch({
      type: 'setType',
      payload: 'Add New Sub Category'
    });
  };

  const onClickAddNewSubCategory = async () => {
    try {
      if (state.price <= 0) {
        alert('Please Input a Valid Price!!');
        return;
      }

      if (state.value === '') {
        alert('Please Input a Valid Lab Test Name!!');
        return;
      }

      const data = {
        category_id: state.id,
        sub_category_name: state.value,
        price: state.price,
        authBy: authUser.userId
      };

      const res = await reduxDispatch(createNewSubCategory(data));
      if (res.type === 'subCategory/create/fulfilled') {
        handleOnClose();
        fetchSubCategory();
        fetchCategory();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClose = () => {
    dispatch({
      type: 'setId',
      payload: 0
    });
    dispatch({
      type: 'setPrice',
      payload: 0
    });
    dispatch({
      type: 'setValue',
      payload: ''
    });
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
              <Box
                component="form"
                noValidate
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={4}
                >
                  <Grid item xs={12}>
                    <TextField
                      name="subCategory"
                      required
                      fullWidth
                      id="subCategory"
                      label="New Sub-Category Name"
                      value={state.value}
                      onChange={handleValueChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      name="price"
                      required
                      fullWidth
                      id="price"
                      value={state.price}
                      label="Price"
                      onChange={handlePriceChange}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Button onClick={handleOnClose}>Cancel</Button>
                  <Button
                    variant="contained"
                    onClick={onClickUpdateSubCategory}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
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
                    value={state.value}
                    onChange={handleValueChange}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button onClick={handleOnClose}>Cancel</Button>
                    <Button variant="contained" onClick={onClickUpdateCategory}>
                      Update
                    </Button>
                  </Box>
                </Box>
              </>
            );
          } else if (state.type === 'Add New Sub Category') {
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
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}
                  >
                    <Grid item xs={12}>
                      <TextField
                        name="newSubCategory"
                        required
                        fullWidth
                        id="newSubCategory"
                        label="New Sub-Category Name"
                        onChange={handleValueChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        name="price"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        onChange={handlePriceChange}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2 }}>
                    <Button onClick={handleOnClose}>Cancel</Button>
                    <Button
                      variant="contained"
                      onClick={onClickAddNewSubCategory}
                    >
                      Submit
                    </Button>
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
                    name="category"
                    required
                    fullWidth
                    id="category"
                    label="New Category Name"
                    value={state.value}
                    onChange={handleValueChange}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button onClick={handleOnClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddNewCategory}>
                      Add
                    </Button>
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
              <CardHeader
                title="Laboratory Categories and Sub Categories"
                action={
                  <IconButton
                    aria-label="settings"
                    color="primary"
                    onClick={onOpenAddNewCat}
                  >
                    <AddIcon />
                  </IconButton>
                }
              />
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
                              <>
                                <IconButton
                                  aria-label="edit"
                                  size="small"
                                  color="info"
                                  onClick={() =>
                                    onEditCategory(data.id, data.category_name)
                                  }
                                >
                                  <ModeEditOutlineIcon />
                                </IconButton>
                                <Divider
                                  orientation="vertical"
                                  flexItem
                                  sx={{ mr: 2, ml: 1 }}
                                />
                              </>
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
                          ?.filter((subData) => subData.category_id === data.id)
                          .map((subCat, i) => (
                            <FormGroup key={i}>
                              <FormControlLabel
                                control={
                                  <>
                                    <IconButton
                                      aria-label="edit"
                                      size="small"
                                      onClick={() =>
                                        onEditSubCategory(
                                          subCat.id,
                                          subCat.sub_category_name,
                                          subCat.price
                                        )
                                      }
                                    >
                                      <ModeEditOutlineIcon />
                                    </IconButton>
                                    <IconButton
                                      aria-label="edit"
                                      size="small"
                                      color="secondary"
                                      onClick={() =>
                                        onDeleteSubCategory(subCat.id)
                                      }
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                    <Divider
                                      orientation="vertical"
                                      flexItem
                                      sx={{ mr: 2, ml: 1 }}
                                    />
                                  </>
                                }
                                label={(function () {
                                  return (
                                    <Box
                                      sx={{
                                        width: '100%',
                                        mt: 1
                                      }}
                                    >
                                      {subCat.sub_category_name}{' '}
                                      <Typography sx={{ fontWeight: 'bold' }}>
                                        ₱ {Number(subCat.price)}
                                      </Typography>
                                      <Box
                                        sx={{
                                          height: '1px',
                                          backgroundColor: 'gray',
                                          width: '100%'
                                        }}
                                      ></Box>
                                    </Box>
                                  );
                                })()}
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
                            onClick={() => onAddNewSubCategory(data.id)}
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
