import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
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
            startIcon={<QrCode2Icon />}
          >
            Generate QR Code
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default GenerateQR;
