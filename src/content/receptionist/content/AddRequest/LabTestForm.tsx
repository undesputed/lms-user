import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Button, Grid, Typography } from '@mui/material';
import { LabTestType } from './types.d';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const LabTestForm: React.FC<LabTestType> = (props) => {
  return (
    <>
      <Box component="form" noValidate m={3} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={props.subCategory.sort(
                (a, b) =>
                  -b.sub_category_name.localeCompare(a.sub_category_name)
              )}
              disableCloseOnSelect
              onChange={props.handleSubcategoryChange}
              getOptionLabel={(option: any) => option.sub_category_name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.sub_category_name}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select lab Tests"
                  placeholder="Favorites"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name="others"
              required
              fullWidth
              id="others"
              helperText="Others"
              label="Others"
              onChange={(e: any) => props.handleOnChange(e)}
            />
          </Grid>
        </Grid>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={props.handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              {props?.index === props?.length - 1 ? 'Finish' : 'Continue'}
            </Button>
            <Button
              disabled={props.index === 0}
              onClick={props.handleBack}
              sx={{ mt: 1, mr: 1 }}
            >
              Back
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default LabTestForm;
