import React from 'react';
import {
  Card,
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  CardContent,
  TextField
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Text from 'src/components/Text';
import { BasicInfoProp } from './types.d';
import InfoModal from './infoModal';

const BasicInfo: React.FC<BasicInfoProp> = (props) => {
  const [open, setOpen] = React.useState<boolean>(props.open);
  const [name, setName] = React.useState<string>('');
  const [label, setLabel] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const onEdit = (label: string, name: string) => {
    if (
      label === 'Date of Visit' ||
      label === 'Birthday' ||
      label === 'Date Requested'
    ) {
      setType('date');
    } else {
      setType('text');
    }
    setName(name);
    setLabel(label);
    setOpen(true);
  };

  const renderEditButton = (label: string, name: string) => {
    return (
      <Button
        variant="text"
        size="small"
        startIcon={<EditTwoToneIcon />}
        onClick={() => onEdit(label, name)}
      />
    );
  };

  return (
    <Grid container spacing={3} mb={2}>
      <Grid item xs={12}>
        <InfoModal
          label={label}
          textField={
            <TextField
              type={type}
              name={name}
              fullWidth
              id={label}
              helperText={label}
              onChange={(e) => props.onChange(e)}
            />
          }
          open={open}
          handleClose={handleClose}
          handleUpdate={props.handleUpdate}
        />
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
          </Box>
          <Divider />
          <CardContent>
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
              gap={2}
            >
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Name:
                  {renderEditButton('Name', 'name')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {props.basicInfo?.name}
                </Typography>
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Date of Visit:
                  {renderEditButton('Date of Visit', 'dateOfVisit')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {(function () {
                    const date = new Date(props.basicInfo?.dateOfVisit);
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
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Contact Number:
                  {renderEditButton('Contact Number', 'phone')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {props.basicInfo?.phone}
                </Typography>
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Birthday:
                  {renderEditButton('Birthday', 'birthday')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {(function () {
                    const date = new Date(props.basicInfo?.birthday);
                    const formattedDate = date.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    });

                    return formattedDate;
                  })()}
                </Typography>
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Gender:
                  {renderEditButton('Gender', 'gender')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {(function () {
                    if (props.basicInfo?.gender === 1) {
                      return (
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          Male
                        </Typography>
                      );
                    } else if (props.basicInfo?.gender === 2) {
                      return (
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          Female
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
                        >
                          Others
                        </Typography>
                      );
                    }
                  })()}
                </Typography>
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Company Name:
                  {renderEditButton('Company Name', 'companyName')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {(function () {
                    if (
                      props.basicInfo?.companyName === '' ||
                      props.basicInfo?.companyName === null ||
                      props.basicInfo?.companyName === undefined
                    ) {
                      return 'N/A';
                    } else {
                      return props.basicInfo?.companyName;
                    }
                  })()}
                </Typography>
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Others:
                  {renderEditButton('Others', 'others')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {(function () {
                    if (
                      props.basicInfo?.others === '' ||
                      props.basicInfo?.others === null ||
                      props.basicInfo?.others === undefined
                    ) {
                      return 'N/A';
                    } else {
                      return props.basicInfo?.others;
                    }
                  })()}
                </Typography>
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Referred By:
                  {renderEditButton('Referred By', 'referredBy')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {(function () {
                    if (
                      props.basicInfo?.referredBy === '' ||
                      props.basicInfo?.referredBy === null ||
                      props.basicInfo?.referredBy === undefined
                    ) {
                      return 'N/A';
                    } else {
                      return props.basicInfo?.referredBy;
                    }
                  })()}
                </Typography>
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Date Requested:
                  {renderEditButton('Date Requested', 'dateRequested')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {(function () {
                    const date = new Date(props.basicInfo?.dateRequested);
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
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Address:
                  {renderEditButton('Address', 'address')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1 }}
                >
                  {props.basicInfo?.address}
                </Typography>
              </Box>
              <Box p={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Status:
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold', pt: 1, color: 'green' }}
                >
                  {(function () {
                    if (props.basicInfo?.status === 1) {
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
                    } else if (props.basicInfo?.status === 2) {
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
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BasicInfo;
