import { ReactNode } from 'react';
import { SvgIconProps } from '@mui/material';

export interface CardProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  width?: string;
  height?: string;
  borderColor?: string;
  backgroundColor?: string;
  titleFontColor?: string;
  bodyFontColor?: string;
  titleFontSize?: string;
  bodyFontSize?: string;
  icon?: React.FunctionComponent<SvgIconProps>;
  iconPosition?: 'left' | 'right';
  contentAlign?: 'left' | 'center' | 'right';
}
