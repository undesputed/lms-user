import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Grid,
  Container,
  Card,
  Box,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button
} from '@mui/material';
import Footer from 'src/components/Footer';
import PatientListTable from './PatientListTable';

function ResultsManagement() {
  return (
    <>
      <Helmet>
        <title>Patient Management - Applications</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card
              sx={{
                mt: 2
              }}
            >
              <CardHeader
                action={
                  <Box width={150} display={'flex'} flexDirection={'row'}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Status</InputLabel>
                      <Select label="Status" autoWidth>
                        <MenuItem key="test" value="test">
                          test
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                      <Button variant="contained" fullWidth size="small">
                        Import CSV
                      </Button>
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                      <Button variant="contained" fullWidth size="small">
                        Export CSV
                      </Button>
                    </FormControl>
                  </Box>
                }
                title="Recent Orders"
              />
              <Divider />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <PatientListTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ResultsManagement;
