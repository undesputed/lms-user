import React, { ChangeEvent } from 'react';
import { Card, Box, Button, Grid, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { darken } from '@mui/system';

const ApprovalSection = () => {
  const theme = useTheme();

  const handleCancel = () => {
    // TODO: Handle cancel action
  };

  const handleSubmit = () => {
    // TODO: Handle submit action
  };

  // Calculate the darker shade of the background color
  const cancelButtonColor = darken(theme.palette.error.main, 0.2);
  const submitButtonColor = darken(theme.palette.success.main, 0.2);

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
              Cancel
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
                Submit
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ApprovalSection;
