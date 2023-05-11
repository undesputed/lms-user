import { Typography } from '@mui/material';
import { profileType } from './types.d';

const PageHeader: React.FC<profileType> = (props) => {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        User Settings
      </Typography>
      <Typography variant="subtitle2">
        <strong>
          {props.user?.firstName} {props.user?.middleName}{' '}
          {props.user?.lastName}
        </strong>
        , this could be your user settings panel.
      </Typography>
    </>
  );
};

export default PageHeader;
