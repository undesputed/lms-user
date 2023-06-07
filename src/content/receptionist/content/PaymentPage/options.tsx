import { ChangeEvent, useState } from 'react';
import {
  Box,
  Grid,
  Radio,
  FormControlLabel,
  Typography,
  Card,
  CardHeader,
  Divider,
  lighten,
  CardContent,
  IconButton,
  Avatar,
  styled,
  Button,
  useTheme,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { darken } from '@mui/system';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Gcash from 'src/assets/image/random/gcash.png';
import cash from 'src/assets/image/random/cash.png';
import { OptionProps } from './types.d';

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardLogo = styled('img')(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.colors.alpha.white[100]};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

const CardCc = styled(Card)(
  ({ theme }) => `
     border: 1px solid ${theme.colors.alpha.black[30]};
     background: ${theme.colors.alpha.black[5]};
     box-shadow: none;
`
);

const PaymentOption: React.FC<OptionProps> = (props) => {
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState('cash');
  const [serialNumber, setSerialNumber] = useState('');

  const onSubmit = () => {
    props.onSubmit(selectedValue, serialNumber);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const cancelButtonColor = darken(theme.palette.warning.main, 0.2);
  const submitButtonColor = darken(theme.palette.primary.main, 0.2);

  return (
    <Card sx={{ mt: 5 }}>
      <CardHeader subheader="Please Choose Payment Method" title="Payment" />
      <Divider />
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
              <Box display="flex" alignItems="center">
                <CardLogo src={cash} width={'100'} alt="Visa" height={'65'} />
                <Box>
                  <Typography variant="h3" fontWeight="normal">
                    Cash
                  </Typography>
                  <Typography variant="subtitle2">Pay with Cash.</Typography>
                </Box>
              </Box>
              <Box
                pt={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControlLabel
                  value="cash"
                  control={
                    <Radio
                      checked={selectedValue === 'cash'}
                      onChange={handleChange}
                      value="cash"
                      color="primary"
                      name="cash"
                    />
                  }
                  label="Cash"
                />
              </Box>
            </CardCc>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
              <Box display="flex" alignItems="center">
                <CardLogo src={Gcash} width={'100'} alt="Visa" height={'65'} />

                <Box>
                  <Typography variant="h3" fontWeight="normal">
                    G-Cash
                  </Typography>
                  <Typography variant="subtitle2">Pay with G-Cash.</Typography>
                </Box>
              </Box>
              <Box
                pt={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControlLabel
                  value="gcash"
                  control={
                    <Radio
                      checked={selectedValue === 'gcash'}
                      onChange={handleChange}
                      value="gcash"
                      color="primary"
                      name="gcash"
                    />
                  }
                  label="G-Cash"
                />
              </Box>
            </CardCc>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CardAddAction>
              <CardContent>
                <Paper elevation={3} sx={{ width: '100%', padding: '20px' }}>
                  {selectedValue === 'gcash' ? (
                    <>
                      <Typography
                        variant="h5"
                        sx={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          textAlign: 'left'
                        }}
                      >
                        Serial Number
                      </Typography>
                      <TextField
                        type="text"
                        id="outlined-select-currency"
                        style={{
                          width: '100%',
                          marginBottom: '20px'
                        }}
                        label="Serial Number"
                        name="serialNumber"
                        required
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                      />
                    </>
                  ) : null}
                  <Typography
                    variant="h5"
                    sx={{
                      marginBottom: '20px',
                      fontWeight: 'bold',
                      textAlign: 'left'
                    }}
                  >
                    Invoice
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead
                        sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
                      >
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell>Sub-Category</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Unit Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.subCategory?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {(function () {
                                const cat = props.category?.find(
                                  (d) => d.id === item.category_id
                                );
                                return cat?.category_name;
                              })()}
                            </TableCell>
                            <TableCell>{item.sub_category_name}</TableCell>
                            <TableCell align="right">1</TableCell>
                            <TableCell align="right">
                              ₱ {Number(item.price).toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              ₱ {Number(item.price).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h3"
                    sx={{
                      marginBottom: '20px',
                      marginRight: '20px',
                      fontWeight: 'bold',
                      textAlign: 'right',
                      pt: 5
                    }}
                  >
                    Total: ₱{' '}
                    {(function () {
                      let total = 0;
                      props.subCategory?.map((d) => {
                        total += d.price;
                      });

                      return Number(total).toLocaleString();
                    })()}
                  </Typography>
                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <Button
                      variant="contained"
                      startIcon={<DeleteTwoToneIcon />}
                      style={{
                        backgroundColor: cancelButtonColor,
                        color: theme.palette.success.contrastText
                      }}
                    >
                      Go Back
                    </Button>
                    <Box ml={1}>
                      <Button
                        variant="contained"
                        startIcon={<AddCircleIcon />}
                        style={{
                          backgroundColor: submitButtonColor,
                          color: theme.palette.success.contrastText
                        }}
                        onClick={onSubmit}
                      >
                        Proceed
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </CardContent>
            </CardAddAction>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default PaymentOption;
