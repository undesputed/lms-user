import React, { ChangeEvent, useState } from 'react';
import {
  Card,
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  CardContent,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useTheme,
  TextField,
  MenuItem,
  Pagination
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Text from 'src/components/Text';
import { format } from 'date-fns';
import { LabTestProps } from './types.d';

const LabTest: React.FC<LabTestProps> = (props) => {
  const theme = useTheme();
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setPage(1); // Reset page when filter changes
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filteredLabTest = props.labTest?.filter((item) =>
    item.sub_category_name.toLowerCase().includes(filter.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedLabTest = filteredLabTest?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Grid container spacing={3} mt={2}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="subtitle2">
                Manage information related to your personal details
              </Typography>
            </Box>
            <Button
              variant="text"
              startIcon={<AddCircleIcon />}
              onClick={props.handleAddTest}
            >
              Add Test
            </Button>
          </Box>
          <Divider />
          <CardContent>
            <Box mb={2}>
              <TextField
                label="Filter by test name"
                variant="outlined"
                value={filter}
                onChange={handleFilterChange}
              />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
                    <TableCell>Category ID</TableCell>
                    <TableCell>Laboratory Test</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedLabTest?.map((item, index) => (
                    <TableRow hover key={index} sx={{ textAlign: 'center' }}>
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
                          {item.category_id}
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
                          {item.sub_category_name}
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
                          {item.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          sx={{ fontWeight: 'bold', pt: 1, color: 'green' }}
                        >
                          {(function () {
                            if (item.status === 1) {
                              return (
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  gutterBottom
                                  noWrap
                                  sx={{ color: '#336699' }}
                                >
                                  Pending
                                </Typography>
                              );
                            } else if (item.status === 2) {
                              return (
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  gutterBottom
                                  noWrap
                                  sx={{ color: '#00FF00' }}
                                >
                                  In Progress
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
                                  sx={{ color: '#0000FF' }}
                                >
                                  Completed
                                </Typography>
                              );
                            }
                          })()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Delete Order" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() =>
                              props.handleOnDelete(
                                item.id,
                                item.sub_category_name
                              )
                            }
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
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(filteredLabTest?.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LabTest;
