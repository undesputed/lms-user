import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { PageHeaderType } from './types.d';

const PageHeader: React.FC<PageHeaderType> = (props) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Patient Management
        </Typography>
        <Typography variant="subtitle2">
          These are your recent Patient Lists
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={props.onClick}
        >
          Add New Patient
        </Button>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
