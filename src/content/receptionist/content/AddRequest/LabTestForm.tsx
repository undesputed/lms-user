import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { LabTestType } from './types.d';
import LabTestModal from './LabTestModal';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const LabTestForm: React.FC<LabTestType> = (props) => {
  const [selectedTest, setSelectedTest] = React.useState([]);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onSelectSubCat = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.target.checked) {
      props.handleSubcategoryChange(
        e,
        props.subCategory.find((d) => d.id === id)
      );
    } else {
      props.handleSubcategoryChange(
        e,
        props.subCategory.find((d) => d.id === id)
      );
    }
  };
  return (
    <>
      <Box component="form" noValidate m={3} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box mb={2} mt={2}>
              {(function () {
                if (props.selected.length !== 0) {
                  return (
                    <Typography
                      sx={{ mt: 4, mb: 2, fontWeight: '600' }}
                      variant="h6"
                      component="div"
                    >
                      Selected Laboratory Tests:
                    </Typography>
                  );
                } else {
                  return null;
                }
              })()}
              <List dense={false}>
                {props.selected?.map((data, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(e: any) => props.onDelete(e, data)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        props.subCategory?.find((d) => d.id === data)
                          .sub_category_name
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" onClick={handleOpen}>
                Choose Lab Test
              </Button>
            </Box>
            <LabTestModal
              open={open}
              onSelectSubCat={onSelectSubCat}
              handleClose={handleClose}
              category={props.category}
              subCategory={props.subCategory}
              handleSelectCat={props.handleSelectCat}
              handleSubmit={props.handleSubmit}
            />
            {/* <Autocomplete
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
            /> */}
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
