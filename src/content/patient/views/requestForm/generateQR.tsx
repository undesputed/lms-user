import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { qrCodeInterface } from './interface';

const GenerateQR: React.FC<qrCodeInterface> = (props) => {
  return (
    <>
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
        <Box>
          <Button
            size="large"
            sx={{ margin: 1 }}
            variant="outlined"
            color="primary"
            startIcon={<ExitToAppIcon />}
          >
            Cancel
          </Button>
          <Button
            size="large"
            sx={{ margin: 1 }}
            variant="contained"
            color="primary"
            onClick={props.onClick}
            startIcon={<PublishIcon />}
          >
            Proceed To Payment
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default GenerateQR;
