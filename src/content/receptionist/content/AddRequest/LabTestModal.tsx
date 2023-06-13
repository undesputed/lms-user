import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper
} from '@mui/material';
import React from 'react';
import { LabTestModalProps } from './types.d';

const LabTestModal: React.FC<LabTestModalProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={'lg'}
    >
      <DialogTitle
        id="alert-dialog-title"
        alignItems={'center'}
        justifyContent={'center'}
        display={'flex'}
      >
        <Typography variant="h3">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography component="h1" variant="h3" align="center" mb={5}>
            LABORATORY CATEGORIES
          </Typography>
          <Grid container spacing={2} m={5}>
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
                    .filter((subData) => subData.category_id === data.id)
                    .map((subCat) => (
                      <FormGroup key={subCat.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e: any) =>
                                props.handleSelectCat(e, subCat.id)
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
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Close</Button>
        {/* <Button variant="contained" onClick={props.handleSubmit} autoFocus>
          Submit
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default LabTestModal;
