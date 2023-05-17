import { useState, MouseEvent, ChangeEvent, useReducer } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  Switch
} from '@mui/material';

import SecurityModal from './SecurityModal';
import { securityReducer } from './reducer';
import { securityInitialState } from './initialState';
import SnackBarComponent from './SnackBar';
import { useAppDispatch } from 'src/actions/hooks';
import { updatePassAsync } from 'src/reducers/user/userReducer';

function SecurityTab() {
  const [state, dispatch] = useReducer(securityReducer, securityInitialState);
  const reduxDispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSnackBarClose = () => [
    dispatch({
      type: 'setOnUpdate',
      payload: false
    })
  ];

  const handleIsError = () => {
    dispatch({
      type: 'setIsError',
      payload: true
    });
  };

  const onSubmit = async (
    email: string,
    oldPass: string,
    newPass: string,
    confirmPass: string
  ) => {
    try {
      const data = {
        email: email,
        oldPass: oldPass,
        newPass: newPass,
        confirmPass: confirmPass
      };
      if (data.newPass !== data.confirmPass) {
        dispatch({
          type: 'setErrorMessage',
          payload: 'Password Does not Match!!'
        });
        dispatch({
          type: 'setSeverity',
          payload: 'error'
        });
        dispatch({
          type: 'setIsError',
          payload: true
        });
        dispatch({
          type: 'setOnUpdate',
          payload: true
        });
        setTimeout(() => {
          dispatch({
            type: 'setOnUpdate',
            payload: false
          });
        }, 2000);
        return;
      }

      dispatch({
        type: 'setErrorMessage',
        payload: 'Update Successfully!'
      });
      dispatch({
        type: 'setSeverity',
        payload: 'success'
      });
      dispatch({
        type: 'setIsError',
        payload: false
      });
      dispatch({
        type: 'setOnUpdate',
        payload: true
      });
      setTimeout(() => {
        dispatch({
          type: 'setOnUpdate',
          payload: false
        });
      }, 2000);
      setIsOpen(false);
      const res = await reduxDispatch(updatePassAsync(data));
      console.log(res);
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'setIsError',
        payload: true
      });
    }
    dispatch({
      type: 'setOnUpdate',
      payload: true
    });
    setTimeout(() => {
      dispatch({
        type: 'setOnUpdate',
        payload: false
      });
    }, 2000);
  };

  return (
    <Grid container spacing={3}>
      <SecurityModal
        setIsError={handleIsError}
        handleOnSubmit={onSubmit}
        open={isOpen}
        handleOnClose={handleOnClose}
        title="Update Password"
      />
      <SnackBarComponent
        isOpen={state.onUpdate}
        severity={state.severity}
        handleClose={handleSnackBarClose}
      >
        {state.errorMessage || 'Update Successfull'}
      </SnackBarComponent>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Security</Typography>
          <Typography variant="subtitle2">
            Change your security preferences below
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Change Password"
                secondary="You can change your password here"
              />
              <Button size="large" variant="outlined" onClick={handleOpen}>
                Change password
              </Button>
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Two-Factor Authentication"
                secondary="Enable PIN verification for all sign in attempts"
              />
              <Switch color="primary" />
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SecurityTab;
