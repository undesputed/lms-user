import { AccountBalance } from '@mui/icons-material';
import { Container, Grid } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AccountSecurity from 'src/content/dashboards/Crypto/AccountSecurity';
import PageHeader from 'src/content/dashboards/Crypto/PageHeader';
import Wallets from 'src/content/dashboards/Crypto/Wallets';
import WatchList from 'src/content/dashboards/Crypto/WatchList';

const MachineIntegration = () => {
  return (
    <>
      <Helmet>
        <title>Machine Integration</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        This is MachineIntegration
      </Container>
      <Footer />
    </>
  );
};

export default MachineIntegration;
