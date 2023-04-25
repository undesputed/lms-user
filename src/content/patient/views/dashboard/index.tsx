import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import Header from '../../components/Header';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import BiotechIcon from '@mui/icons-material/Biotech';

const PatientDashboard = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.length === 0) {
      navigate('/auth/login');
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Header />
      <Container component="main" maxWidth="lg">
        <Box maxHeight={'75vh'} height={'100%'}>
          <Card
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: 'auto',
              paddingTop: '10rem',
              paddingBottom: '10rem',
              margin: '20px'
            }}
          >
            <Typography component="h1" variant="h3" align="center">
              EC-Care Services
            </Typography>
            <Divider />
            <Button
              size="large"
              sx={{ margin: 1 }}
              variant="contained"
              color="primary"
              startIcon={<BiotechIcon />}
              onClick={() => navigate('/patient/requestForm')}
            >
              Apply for a Lab Test
            </Button>
            <Button
              size="large"
              sx={{ margin: 1 }}
              variant="contained"
              color="secondary"
              startIcon={<QrCode2Icon />}
            >
              Generate QR Code
            </Button>
          </Card>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PatientDashboard;
