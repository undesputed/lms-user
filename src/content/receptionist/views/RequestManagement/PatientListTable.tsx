import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
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
import { PageListTableType, requestState } from './types.d';
import { basicInfoFormResponse } from 'src/reducers/requestForm/requestForm';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';

const PatientListTable: React.FC<PageListTableType> = (props) => {
  const theme = useTheme();
  const [status, setStatus] = React.useState<number>(4);
  const [data, setData] = React.useState<basicInfoFormResponse[]>(
    props.request
  );

  React.useEffect(() => {
    if (status === 4) {
      setData(props.request);
    } else {
      const filteredData = props.request?.filter(
        (item) => item.form_status === status
      );
      setData(filteredData);
    }
  }, [props.request, status]);
  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        action={
          <Box width={600}>
            <Stack direction={'row'}>
              <Button
                size="medium"
                color="success"
                startIcon={<UploadIcon />}
                sx={{
                  width: '50%'
                }}
              >
                Export File
              </Button>
              <Button
                size="medium"
                color="warning"
                startIcon={<DownloadIcon />}
                sx={{
                  width: '50%'
                }}
              >
                Import File
              </Button>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  autoWidth
                  value={status}
                  onChange={(e: any) => setStatus(e.target.value)}
                >
                  <MenuItem value={1}>For Payment</MenuItem>
                  <MenuItem value={2}>For Processing</MenuItem>
                  <MenuItem value={3}>Completed</MenuItem>
                  <MenuItem value={4}>All</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
        }
        title="Recent Requests"
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
              <TableCell>Address</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((d: any, index: number) => (
              <TableRow hover key={index}>
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
                    {d.name}
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
                    {d.address}
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
                    {(function () {
                      const date = new Date(d.birthday);
                      const formattedDate = date.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      });

                      return formattedDate;
                    })()}
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
                  </Typography>
                </TableCell>
                <TableCell>
                  {(function () {
                    if (d.form_status === 1) {
                      return (
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          sx={{ color: '#FFA500' }}
                        >
                          For Payment
                        </Typography>
                      );
                    } else if (d.form_status === 2) {
                      return (
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          sx={{ color: '#00BFFF ' }}
                        >
                          For Processing
                        </Typography>
                      );
                    } else {
                      return (
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          sx={{ color: '#008000' }}
                        >
                          Completed
                        </Typography>
                      );
                    }
                  })()}
                </TableCell>
                <TableCell>
                  {(function () {
                    if (d.form_status === 1) {
                      return (
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
                            onClick={() => props.onClickViewRequest(d.form_id)}
                          >
                            <RateReviewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      );
                    } else if (d.form_status === 2) {
                      return (
                        <Tooltip title="Approve Request" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.warning.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => props.onClickApproved(d.form_id)}
                          >
                            <BeenhereIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      );
                    }
                  })()}
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
