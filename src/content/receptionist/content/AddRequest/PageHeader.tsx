import { Typography, Avatar, Grid, Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router';

function PageHeader() {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate('/receptionist/request_management');
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Add New Request!
        </Typography>
        <Typography variant="subtitle2">EC Care Medical Laboratory</Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<ExitToAppIcon fontSize="small" />}
          color="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
