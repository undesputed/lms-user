import React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { category, subCategory } from './types.d';
import { subCategoryReducer } from './reducer';
import { subCategoryState } from './initialState';

interface CategoryProps extends category, subCategory {}

const Categories: React.FC<CategoryProps> = (props) => {
  return (
    <>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h3" align="center" mb={5}>
          LABORATORY REQUEST FORM
        </Typography>
        <Grid container spacing={2} m={5}>
          {props.categoryData?.map((data, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Typography
                  component="h4"
                  variant="h4"
                  sx={{ textTransform: 'uppercase', minWidth: 0 }}
                  mb={2}
                >
                  {data.category_name}
                </Typography>
                {props.subCategoryData
                  .filter((subData) => subData.category_id === data.id)
                  .map((subCat) => (
                    <FormGroup key={subCat.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e: any) =>
                              props.onSelectSubCat(e, subCat.id)
                            }
                          />
                        }
                        label={subCat.sub_category_name}
                      />
                    </FormGroup>
                  ))}
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
};

export default Categories;
