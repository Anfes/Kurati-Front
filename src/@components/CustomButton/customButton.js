import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  primary: {
    background: '#651DFF',
    color: 'white',
    borderRadius: 8,
    '&:hover': {
      background: '#8850FF',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#AA82FF',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: '#EFE8FF',
      textDecoration: 'none',
      color: '#AA82FF',
    },
  },
  outlinePrimary: {
    background: 'white',
    border: '1px solid #651DFF',
    color: '#651DFF',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: '#EFE8FF',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#CDB5FF',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: 'white',
      textDecoration: 'none',
      color: '#CDB5FF',
      border: '1px solid #CDB5FF',
    },
  },
  secundary: {
    background: '#31F2D0',
    color: '#00483B',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: '#62FFE2',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#8FFFEB',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: '#E6E7F7',
      textDecoration: 'none',
      color: '#A4A9D1',
    },
  },
  outlineSecondary: {
    background: 'white',
    border: '1px solid #11AE92',
    color: '#11AE92',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: '#EAFFFB',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#BDFFF3',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: 'white',
      textDecoration: 'none',
      color: '#BDFFF3',
      border: '1px solid #BDFFF3',
    },
  },
  textButton: {
    background: 'white',
    color: '#651DFF',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: '#EFE8FF',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#CDB5FF',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: 'transparent',
      textDecoration: 'none',
      color: '#EFE8FF',
    },
  },
  errorButton: {
    background: '#FFC5C5',
    color: '#00274A',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      background: '#FFBDBD',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#FCBABA',
      textDecoration: 'none',
    },
    '&:disabled': {
      background: '#FFEDED',
      textDecoration: 'none',
      color: '#FFB7B7',
    },
  },
  linkButton: {
    background: 'transparent',
    color: '#fff',
    borderRadius: 8,
    padding: 14,
    '&:hover': {
      textDecoration: 'underline',
      color: '#6B7097',
    },
    '&:focus': {
      textDecoration: 'underline',
      background: 'transparent',
      color: '#6B7097',
    },
    '&:disabled': {
      textDecoration: 'underline',
      background: 'white',
      color: '#B2DBFF',
    },
  },
  customGeneral: {
    textTransform: 'none',
    padding: 14,
    fontWeight: 600,
    fontSize: 14,
  },
}));

const CustomButton = (props) => {
  const {
    label,
    disabled,
    onClick,
    width,
    height,
    className,
    startIcon,
    href,
    endIcon,
    style,
    component,
  } = props;
  const classes = useStyles();
  const sizeButtonHeight =
    height === 'extralarge' ? 64 : height === 'large' ? 56 : height === 'medium' ? 48 : 32;
  const sizeButtonWidth = width === 'full' ? '100%' : 'fit-content';
  const typeButton =
    className === 'primary'
      ? classes.primary
      : className === 'outlinePrimary'
      ? classes.outlinePrimary
      : className === 'secondary'
      ? classes.secundary
      : className === 'outlineSecondary'
      ? classes.outlineSecondary
      : className === 'linkButton'
      ? classes.linkButton
      : className === 'error'
      ? classes.errorButton
      : classes.textButton;

  return (
    <Button
      {...props}
      className={clsx(typeButton, classes.customGeneral)}
      style={{ ...style, width: sizeButtonWidth, height: sizeButtonHeight }}
      disabled={disabled}
      disableElevation
      disableRipple={false}
      variant={className === 'primary' ? 'contained' : 'text'}
      onClick={onClick}
      href={href}
      startIcon={startIcon}
      endIcon={endIcon}
      component={component}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
