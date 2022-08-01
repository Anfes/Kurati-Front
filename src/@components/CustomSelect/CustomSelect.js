import { makeStyles } from '@mui/styles';
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 6,
      minWidth: 200,
      minHeight: 43,
      '& svg': {
        color: '#023E73',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#BDD7EF',
        borderWidth: 1,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#145C9C',
        borderWidth: 1,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#145C9C',
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
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FF4D4D',
    },
    '& .MuiOutlinedInput-root.Mui-error': {
      color: '#FF4D4D',
      '& input': {
        borderRadius: 6,
        fontSize: 12,
        padding: 16,
      },
    },
    '& .MuiFormLabel-root': {
      fontWeight: 400,
      fontSize: 12,
      color: '#023E73',
      marginTop:'-3px',
      '&.Mui-focused': {
        color: '#145C9C',
        fontWeight: 500,
      },
      '&.Mui-error': {
        color: '#FF4D4D',
        fontWeight: 500,
      },
      '&.Mui-disabled': {
        color: '#9DB8D1',
      },
    },
    '& > div .MuiSelect-select': {
      '&:focus': {
        background: 'white',
      },
    },
  },
  optionMenu: {
    padding: 10,
    fontWeight: 400,
    color: '#023E73',
    fontSize: 12,
    marginLeft: 4,
    marginRight: 8,
    '&:hover': {
      borderRadius: 4,
      backgroundColor: '#D0E9FF',
      color: '#023E73',
      fontWeight: 500,
    },
    '& .MuiButtonBase-root-MuiMenuItem-root.Mui-selected': {
      borderRadius: 4,
      backgroundColor: '#145C9C',
      color: '#4FDFC8',
      fontWeight: 600,
    },
  },
}));

const CustomSelect = (props) => {
  const classes = useStyles();
  const {
    value,
    onChange,
    options,
    label,
    name,
    error,
    disabled,
    minLength,
    maxLength,
    defaultValue,
    empty,
  } = props;

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel error={error}>{label}</InputLabel>
      <Select
        {...props}
        value={value}
        onChange={onChange}
        label={label}
        error={error}
        disabled={disabled}
        inputProps={{
          name,
          id: name,
          maxLength,
          minLength,
        }}
        defaultValue={defaultValue}
        className={classes.select}
        style={{
            minHeight: 0,
            height:43
        }}
      >
        {empty ? (
          <MenuItem value="" className={classes.optionMenu}>
            <em>----</em>
          </MenuItem>
        ) : (
          ''
        )}
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <MenuItem key={option.value} value={option.value} className={classes.optionMenu}>
              {option.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
