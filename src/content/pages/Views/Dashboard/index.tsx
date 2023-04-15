import React from 'react';
import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import CustomCard from 'src/components/Card';
import { Edit as EditIcon } from '@mui/icons-material';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Container maxWidth="lg">
        <CustomCard
          title="10000"
          icon={EditIcon}
          iconPosition="left"
          width="200px"
          height="150px"
          borderColor="#f00"
          backgroundColor="#eee"
          titleFontColor="#00f"
          bodyFontColor="#555"
          titleFontSize="1.5rem"
          bodyFontSize="1.1rem"
        >
        </CustomCard>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
