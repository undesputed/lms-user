import React, { ChangeEvent } from 'react';
import { Card, Box, Button, Grid, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { darken } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';

const ApprovalSection = () => {
  const theme = useTheme();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('form_id');
  const navigate = useNavigate();

  const handleCancel = () => {
    // TODO: Handle cancel action
  };

  const handleSubmit = () => {
    navigate(`/receptionist/payment?form_id=${id}`);
  };

  // Calculate the darker shade of the background color
  const cancelButtonColor = darken(theme.palette.warning.main, 0.2);
  const submitButtonColor = darken(theme.palette.primary.main, 0.2);

  return (
    <Grid container spacing={3} mt={2}>
      <Grid item xs={12}>
        <Card>
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
            bgcolor={theme.palette.background.paper}
          >
            <Button
              variant="contained"
              startIcon={<DeleteTwoToneIcon />}
              style={{
                backgroundColor: cancelButtonColor,
                color: theme.palette.error.contrastText
              }}
              onClick={handleCancel}
            >
              Go Back
            </Button>
            <Box ml={1}>
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                style={{
                  backgroundColor: submitButtonColor,
                  color: theme.palette.success.contrastText
                }}
                onClick={handleSubmit}
              >
                Proceed
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ApprovalSection;
