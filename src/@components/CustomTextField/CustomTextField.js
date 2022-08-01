import PropTypes from 'prop-types';

import { createStyles, makeStyles } from '@mui/styles';

import { TextField } from '@mui/material';

const useStyles = makeStyles((theme) =>
  createStyles({
    customTextField: {
      borderRadius: 6,
      minWidth: 200,
      width: '100%',
      '& .MuiOutlinedInput-root': {
        minHeight: 43,
        '& .MuiInputBase-root-MuiOutlinedInput-root': {
          color: '#BDD7EF',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#BDD7EF',
          borderWidth: 1,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#00274A',
          borderWidth: 1,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#145C9C',
          borderWidth: 1,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: '#FF4D4D',
          borderWidth: 1,
        },
        '&.Mui-disabled': {
          background: '#F9FCFF',
          color: '#9DB8D1',
          borderColor: '#BDD7EF',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#BDD7EF',
            borderWidth: 1,
          },
        },
      },
      '& .MuiOutlinedInput-input': {
        padding: ' 0px 16px',
        fontWeight: 400,
        fontSize: 12,
        marginBottom: '-2px',
        '&:focused': {
          color: '#145C9C',
        },
        '&:hover': {
          color: '#223240',
        },
        '&.Mui-error': {
          color: '#FF4D4D',
        },
        '&.Mui-disabled': {
          color: '#9DB8D1',
        },
      },
      '& .MuiFormHelperText-root': {
        color: 'orange',
        marginTop: 4,
        fontWeight: 500,
        textAlign: 'right',
        '&.Mui-error': {
          color: '#FF4D4D',
        },
      },
      '& .MuiFormLabel-root': {
        color: '#023E73',
        fontWeight: 400,
        fontSize: 12,
        backgroundColor: 'white',
        marginTop: '-3px',
        '&.Mui-focused': {
          color: '#145C9C',
          fontWeight: 500,
          backgroundColor: 'white',
          marginTop: '0px',
        },
        '&.Mui-error': {
          color: '#FF4D4D',
          fontWeight: 500,
          backgroundColor: 'white',
        },
        '&.Mui-disabled': {
          color: '#9DB8D1',
          backgroundColor: 'white',
        },
      },
      '&:hover .MuiFormLabel-root': {
        color: '#223240',
        backgroundColor: 'white',
        '&.Mui-disabled': {
          color: '#9DB8D1',
          backgroundColor: 'white',
        },
      },
    },
    customMultiLine: {
      width: '100%',
      background: '#FFFF',
      fontSize: 12,
      borderRadius: 4,
      fontFamily: 'BrandonGrotesque-Medium',
      '& .MuiOutlinedInput-input': {
        color: '#223240',
        fontWeight: 400,
        fontSize: 12,
        '&.Mui-disabled': {
          color: '#9DB8D1',
        },
        '&::-webkit-scrollbar': {
          width: 8,
          height: 0,
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c3c3c3',
          borderRadius: 2,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#888',
          borderRadius: 2,
        },
      },
      '& > div': {
        borderRadius: 4,
        fontSize: 12,
        padding: 17,
      },
      '& textarea': {
        fontSize: 17,
      },
    },
  })
);

const CustomTextField = (props) => {
  const {
    value,
    name,
    style,
    error,
    helperText,
    multiline,
    rows,
    placeholder,
    disabled,
    inputRef,
    variant,
    height,
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <TextField
        {...props}
        value={value}
        name={name}
        style={style}
        className={classes.customTextField}
        error={error}
        helperText={helperText}
        multiline={multiline || false}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled || false}
        inputRef={inputRef}
        variant={variant}
      />
    </div>
  );
};

CustomTextField.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  style: PropTypes.any,
  className: PropTypes.any,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  inputRef: PropTypes.any,
  variant: PropTypes.string,
};

export default CustomTextField;
