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
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { PatientList } from './Patient_Interface';
import * as api from 'src/api/apiTest';
import { PageListTableType } from './types.d';

const PatientListTable: React.FC<PageListTableType> = (props) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select label="Status" autoWidth>
                <MenuItem key="pending" value="pending">
                  Pending
                </MenuItem>
                <MenuItem key="inProgress" value="inProgress">
                  In Progress
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Recent Orders"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.request?.map((d) => (
              <TableRow hover key={d.id}>
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
                    {d.firstName} {d.middleName} {d.lastName}{' '}
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
                    {d.phone}
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
                    {d.age}
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
                    {d.address}
                  </Typography>
                </TableCell>
                <TableCell>
                  {(function () {
                    const date = new Date(d.dateOfVisit);
                    const formattedDate = date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      timeZone: 'UTC'
                    });

                    return formattedDate;
                  })()}
                </TableCell>
                <TableCell>
                  {(function () {
                    if (d.status === 1) {
                      return (
                        <Typography sx={{ color: '#336699' }}>
                          Pending
                        </Typography>
                      );
                    } else if (d.status === 2) {
                      return (
                        <Typography sx={{ color: '#00FF00' }}>
                          In Progress
                        </Typography>
                      );
                    } else {
                      return (
                        <Typography sx={{ color: '#0000FF' }}>
                          Completed
                        </Typography>
                      );
                    }
                  })()}
                </TableCell>
                <TableCell>
                  <Tooltip title="View Request" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small"
                      onClick={() => props.onClickViewRequest(d.id)}
                    >
                      <RateReviewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject Request" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.error.lighter
                        },
                        color: theme.palette.error.main
                      }}
                      color="inherit"
                      size="small"
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default PatientListTable;
