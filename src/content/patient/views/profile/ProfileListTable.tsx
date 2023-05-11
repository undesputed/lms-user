import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { profileState } from './types.d';
import * as api from 'src/api/apiTest';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

const PatientListTable = () => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select label="Status" autoWidth>
                <MenuItem key="test" value="test">
                  test
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Pending Requests"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  Carrie
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  test
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  test
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  test
                </Typography>
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell>
                <Tooltip title="Update Transaction" arrow>
                  <IconButton
                    sx={{
                      '&:hover': {
                        background: theme.colors.primary.lighter
                      },
                      color: theme.palette.primary.main
                    }}
                    color="inherit"
                    size="small"
                  >
                    <EditTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Transaction" arrow>
                  <IconButton
                    sx={{
                      '&:hover': {
                        background: theme.colors.info.lighter
                      },
                      color: theme.palette.success.main
                    }}
                    color="inherit"
                    size="small"
                  >
                    <ImageSearchIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default PatientListTable;