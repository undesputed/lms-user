import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { category } from './types.d';

const Categories: React.FC<category> = (props) => {
  return (
    <>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h3" align="center">
          LABORATORY REQUEST FORM
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={4}>

            </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Categories;
