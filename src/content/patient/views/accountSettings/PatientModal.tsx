import React from 'react';
import { modalType } from './types.d';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const PatientModal: React.FC<modalType> = (props) => {
  const [fName, setFname] = React.useState<string>(props.profile?.firstName);
  const [mName, setMname] = React.useState<string>(props.profile?.middleName);
  const [lName, setLname] = React.useState<string>(props.profile?.lastName);
  const [birthday, setBirthday] = React.useState<any>(props.profile?.birthday);
  const [phone, setPhone] = React.useState<string>(props.profile?.phone);
  const [gender, setGender] = React.useState<number>(props.profile?.sex);
  const [address, setAddress] = React.useState<string>(props.profile?.address);

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = () => {
    const age = calculateAge(birthday);
    props.handleUpdateDetails(
      fName,
      mName,
      lName,
      birthday,
      phone,
      age,
      gender,
      address
    );
  };

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      sx={{
        p: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <DialogTitle>
        <Typography variant="h4" align="center">
          {props.tittle}
        </Typography>
      </DialogTitle>
      <Box component="form" noValidate m={3} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              name="firstName"
              required
              fullWidth
              id="firstName"
              helperText="First Name"
              value={fName}
              onChange={(e) => setFname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              name="middleName"
              required
              fullWidth
              id="middleName"
              helperText="M.I"
              value={mName}
              onChange={(e) => setMname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              name="lastName"
              required
              fullWidth
              id="lastName"
              helperText="last Name"
              value={lName}
              onChange={(e) => setLname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="phone"
              required
              fullWidth
              id="phone"
              helperText="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              id="outlined-select-currency"
              helperText="Birthday"
              style={{
                width: '100%'
              }}
              value={birthday}
              onChange={(e) => {
                setBirthday(e.target.value);
                calculateAge(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sex</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={gender}
                onChange={(e) => setGender(Number(e.target.value))}
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
              type="text"
              id="outlined-select-currency"
              helperText="Complete Address"
              style={{
                width: '100%'
              }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button
              size="medium"
              sx={{ marginRight: 1 }}
              variant="outlined"
              color="primary"
              startIcon={<ExitToAppIcon />}
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              size="medium"
              sx={{ marginLeft: 1 }}
              variant="contained"
              color="primary"
              startIcon={<PublishIcon />}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default PatientModal;
