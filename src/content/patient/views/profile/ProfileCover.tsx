import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import coverPhoto from 'src/assets/image/random/cover.jpg';
import profilePic from 'src/assets/image/random/profilePic.jpg';
import { CoverType } from './types.d';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AvatarWrapper,
  ButtonUploadWrapper,
  CardCover,
  CardCoverAction,
  Input
} from './styles';

const ProfileCover: React.FC<CoverType> = (props) => {
  return (
    <>
      <Box display="flex" mb={3} mt={3}>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            EC-Care Medical Laboratory
          </Typography>
          <Typography variant="subtitle2">
            241 Ouano Ext., Ibabao-Estancia, Mandaue City, Cebu 6014
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={coverPhoto} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt="Carrie A. Yu" src={profilePic} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography
          gutterBottom
          variant="h3"
          style={{ textTransform: 'uppercase' }}
        >
          {props.user?.firstName} {props.user?.middleName}{' '}
          {props.user?.lastName}
        </Typography>
        <Typography variant="subtitle2">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomized words which don't look even slightly believable.
          If you are going to use a passage
        </Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          Birth Day:{' '}
          <strong>
            {(function () {
              const dateStr = props.user?.birthday;
              const date = new Date(dateStr);
              const formattedDate = date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              });

              return formattedDate;
            })()}{' '}
          </strong>
          | Address: <strong>{props.user?.address}</strong> | Contact Number:{' '}
          <strong>{props.user?.phone}</strong>
        </Typography>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Button
              size="small"
              variant="contained"
              onClick={props.handleOnclick}
            >
              Submit a Request
            </Button>
          </Box>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            size="small"
            variant="text"
            endIcon={<ArrowForwardTwoToneIcon />}
          >
            See all Transaction
          </Button>
        </Box>
      </Box>
    </>
  );
};
ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};
export default ProfileCover;
