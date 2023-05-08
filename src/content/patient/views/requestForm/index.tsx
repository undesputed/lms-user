import * as React from 'react';
import Typography from '@mui/material/Typography';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import Header from '../../components/Header';
import logo from 'src/assets/image/logo/Logo.png';
import Categories from './category';
import { categoryInterface } from './interface';
import { categoryReducer, subCategoryReducer } from './reducer';
import { categoryState, subCategoryState } from './initialState';
import * as api from 'src/api/apiTest';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import GenerateQR from './generateQR';
import Request from './request';
import { useAppSelector, useAppDispatch } from 'src/actions/hooks';
import { getToken } from 'src/reducers/auth/authReducer';
import { fetchUserById, userInterface } from 'src/reducers/user/userReducer';
import { fetchAllCategory } from 'src/reducers/category/categoryReducer';
import {
  fetchAllSubCategory,
  selectSubCategory
} from 'src/reducers/subCategory/subCategoryReducer';
import { subCategory } from 'src/reducers/subCategory/subCategory';
import { category } from 'src/reducers/category/category';

const PatientForm = () => {
  const navigate = useNavigate();
  const [age, setAge] = React.useState(0);
  const [sex, setSex] = React.useState(0);
  const [user, setUser] = React.useState<userInterface>();
  const [fullName, setFullName] = React.useState<string>();
  const [toDate, setToDate] = React.useState<string>(
    new Date().toISOString().substr(0, 10)
  );
  const [birthday, setBirthday] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [category, setCategory] = React.useState<category[]>([]);
  const [subCategory, setSubCategory] = React.useState<subCategory[]>([]);
  const [selectedSubCat, setSelectedSubCat] = React.useState<number[]>([]);
  const [others, setOthers] = React.useState<string>('');
  const [requestedBy, setRequestedBy] = React.useState<string>('');
  const [dateRequested, setDateRequested] = React.useState<string>('');
  const [remarks, setRemarks] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string[]>([]);
  const dispatch = useAppDispatch();

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };

  const onSelectSubCat = (e: any, id: number) => {
    if (e.target.checked) {
      if (selectedSubCat.includes(id)) {
        console.log('Already in the array');
      } else {
        setSelectedSubCat((prevSelectedSubCat) => [...prevSelectedSubCat, id]);
      }
    } else {
      if (selectedSubCat.includes(id)) {
        setSelectedSubCat((prevSelectedSubCat) =>
          prevSelectedSubCat.filter((item) => item !== id)
        );
      }
    }
  };

  const fetchCategorySubCategory = () => {
    try {
      dispatch(fetchAllCategory())
        .then((res) => {
          setCategory(res.payload);
        })
        .catch((err) => {
          console.error(err);
        });
      dispatch(fetchAllSubCategory())
        .then((res) => {
          setSubCategory(res.payload);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPatient = async () => {
    try {
      const data = dispatch(getToken);
      dispatch(fetchUserById(data.userId))
        .then((response) => {
          setUser(response.payload);
          setFullName(
            response.payload.firstName + ' ' + response.payload.lastName
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = () => {
    if (!fullName) {
      setError(true);
      setErrorMsg((prevErrorMsg) => [
        ...prevErrorMsg,
        'Missing field Full Name!!'
      ]);
      return;
    }
    if (!age) {
      setError(true);
      setErrorMsg((prevErrorMsg) => [
        ...prevErrorMsg,
        'Missing field Age required!!'
      ]);
      return;
    }
    if (!sex) {
      setError(true);
      setErrorMsg((prevErrorMsg) => [
        ...prevErrorMsg,
        'Missing field Gender Required!!'
      ]);
      return;
    }
    if (!birthday) {
      setError(true);
      setErrorMsg((prevErrorMsg) => [
        ...prevErrorMsg,
        'Missing field BirthDay Required!!'
      ]);
      return;
    }
    if (!address) {
      setError(true);
      setErrorMsg((prevErrorMsg) => [
        ...prevErrorMsg,
        'Missing field Address Required!!'
      ]);
      return;
    }
  };

  React.useEffect(() => {
    fetchCategorySubCategory();
    fetchPatient();
  }, []);
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box
              gridColumn="span 4"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img src={logo} alt="Logo" style={{ height: '300px' }} />
            </Box>
            <Box gridColumn="span 8">
              <Typography component="h1" variant="h2" align="center">
                EC-Care Laboratory Request Form
              </Typography>
            </Box>
          </Box>
          <hr style={{ height: '3px', backgroundColor: '#1580c3' }} />
          <hr
            style={{
              height: '15px',
              backgroundColor: '#1580c3',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
            }}
          />
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  error={error}
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  helperText="Full Name"
                  value={fullName}
                  onChange={(e: any) => setFullName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={error}
                  type="date"
                  id="outlined-select-currency"
                  helperText="Date of Visit"
                  value={toDate}
                  onChange={(e: any) => setToDate(e.target.value)}
                  InputProps={{
                    inputProps: {
                      min: new Date().toISOString().split('T')[0] // set minimum date to today's date
                    }
                  }}
                  style={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  error={error}
                  type="date"
                  id="outlined-select-currency"
                  helperText="Birthday"
                  value={birthday}
                  onChange={(e: any) => {
                    setBirthday(e.target.value);
                    calculateAge(e.target.value);
                  }}
                  style={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  error={error}
                  type="number"
                  id="outlined-select-currency"
                  helperText="Age"
                  value={age}
                  disabled
                  style={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                  <Select
                    error={error}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sex}
                    onChange={(e: any) => setSex(e.target.value)}
                    label="Age"
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                    <Divider />
                    <MenuItem value={3}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  error={error}
                  type="text"
                  id="outlined-select-currency"
                  helperText="Complete Address"
                  value={address}
                  onChange={(e: any) => setAddress(e.target.value)}
                  style={{
                    width: '100%'
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Categories
          categoryData={category}
          subCategoryData={subCategory}
          onSelectSubCat={onSelectSubCat}
        />
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3 },
            p: { xs: 2 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="others"
                required
                fullWidth
                id="others"
                value={others}
                onChange={(e: any) => setOthers(e.target.value)}
                helperText="Others"
              />
            </Grid>
          </Grid>
        </Paper>
        <Request
          requestedBy={requestedBy}
          setRequestedBy={(e: any) => setRequestedBy(e.target.value)}
          dateRequested={dateRequested}
          setDateRequested={(e: any) => setDateRequested(e.target.value)}
          remarks={remarks}
          setRemarks={(e: any) => setRemarks(e.target.value)}
        />
        <GenerateQR onClick={onSubmit} />
        {error && error ? (
          <Paper>
            <Alert severity="error">
              <AlertTitle>Missing Field Required</AlertTitle>
              {errorMsg &&
                errorMsg?.map((d) => (
                  <>
                    * <strong>{d}</strong>
                  </>
                ))}
            </Alert>
          </Paper>
        ) : null}
      </Container>
      <Footer />
    </>
  );
};

export default PatientForm;
