import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/lab/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { subCategory, category } from './types.d';
import { Typography, FormGroup, FormControlLabel } from '@mui/material';
import { LabTest } from './types.d';

type AddTestProps = {
  open?: boolean;
  handleClose?: () => void;
  subCategory?: subCategory[];
  category?: category[];
  handleAddTestOnChange?: (e: any, id: number) => void;
  handleAddingTest?: () => void;
  labTest?: LabTest[];
};

const AddTest: React.FC<AddTestProps> = (props) => {
  return (
    <Box>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth={'lg'}>
        <DialogTitle>Add Lab Test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box component="form" noValidate m={3} mb={2}>
              <Grid container spacing={2} maxWidth={'xl'}>
                {props.category?.map((data, index) => {
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
                      {props.subCategory
                        ?.filter(
                          (subData) =>
                            subData.category_id === data.id &&
                            !props.labTest?.some(
                              (test) => test.id === subData.id
                            )
                        )
                        .map((subCat) => (
                          <FormGroup key={subCat.id}>
                            <FormControlLabel
                              control={<Checkbox />}
                              label={subCat.sub_category_name}
                              onChange={(event: any) =>
                                props.handleAddTestOnChange(event, subCat.id)
                              }
                            />
                          </FormGroup>
                        ))}
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Close</Button>
          <Button variant="contained" onClick={props.handleAddingTest}>
            Add test
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddTest;
