import { makeStyles } from '@mui/styles';
import { CardProps } from './interface';

export const useStyles = makeStyles({
  card: (props: CardProps) => ({
    width: props.width || '100%',
    height: props.height || 'auto',
    border: `1px solid ${props.borderColor || '#ccc'}`,
    backgroundColor: props.backgroundColor || '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      props.iconPosition === 'left' ? 'flex-start' : 'space-between',
    paddingLeft: props.icon ? '10px' : 'inherit',
    paddingRight: props.icon ? '10px' : 'inherit'
  }),
  title: (props: CardProps) => ({
    color: props.titleFontColor || '#000',
    fontSize: props.titleFontSize || '1.2rem',
    flexGrow: 1,
    paddingLeft: props.iconPosition === 'left' ? '10px' : 'inherit',
    paddingRight: props.iconPosition === 'right' ? '10px' : 'inherit',
    textAlign: props.iconPosition === 'left' ? 'left' : 'inherit'
  }),
  body: (props: CardProps) => ({
    color: props.bodyFontColor || '#000',
    fontSize: props.bodyFontSize || '1rem'
  }),
  icon: {
    marginLeft: '10px',
    marginRight: '10px'
  }
});
