import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  makeStyles,
  Avatar
} from '@mui/material';
import { CardProps } from './interface';
import { useStyles } from './useStyles';

const CustomCard: React.FC<CardProps> = ({
  title,
  subtitle,
  actions,
  children,
  width,
  height,
  borderColor,
  backgroundColor,
  titleFontColor,
  bodyFontColor,
  titleFontSize,
  bodyFontSize,
  icon: Icon,
  iconPosition = 'left'
}) => {
  const classes = useStyles({
    width,
    height,
    borderColor,
    backgroundColor,
    titleFontColor,
    bodyFontColor,
    titleFontSize,
    bodyFontSize,
    iconPosition,
    title,
    children
  });

  const hasChildren = Boolean(children);

  return (
    <Card className={classes.card}>
      {Icon && iconPosition === 'left' && (
        <Avatar className={classes.icon}>
          <Icon />
        </Avatar>
      )}
      <CardHeader
        title={title}
        subheader={subtitle}
        className={classes.title}
      />
      {Icon && iconPosition === 'right' && (
        <Avatar className={classes.icon}>
          <Icon />
        </Avatar>
      )}
      {hasChildren ? (
        <CardContent className={classes.body}>{children}</CardContent>
      ) : (
        ""
      )}
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default CustomCard;
