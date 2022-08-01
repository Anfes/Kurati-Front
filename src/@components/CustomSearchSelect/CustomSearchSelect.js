import React from 'react';
import { makeStyles } from '@mui/styles';
import {
    TextField,
    Typography,
    MenuItem,
    Paper,
    InputAdornment
} from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Select from 'react-select';

const useStyles = makeStyles(theme => ({
    input: {
        display: 'flex',
        padding: 0,
        minHeight: 48,
        cursor: 'pointer',
        background: '#EEF7FF',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflowY: 'hidden',
        padding: 11,
        cursor: 'pointer',
        // '& > div': {
        //     '&.css-1rhbuit-multiValue': {
        //         backgroundColor: 'red',
        //         borderRadius: 6,
        //     },
        // },
        '&::-webkit-scrollbar': {
            width: 5,
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
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
        color: '#9DB8D1'
    },
    singleValue: {
        fontSize: 14,
        color: '#223240',
    },
    placeholder: {
        fontSize: 14,
        color: '#9DB8D1',
        fontWeight: 400,
        cursor: 'pointer',
    },
    paper: {
        zIndex: 9999,
        background: '#EEF7FF',
        left: 0,
        right: 0,
        position: 'absolute',
        color:'#9DB8D1',
        '& > div': {
            maxHeight: 200,

            '&::-webkit-scrollbar': {
                width: 5,
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

            '& > div': {
                background: '#EEF7FF',
    
                margin: '0px 8px 0px 3px',
                '&:hover': {
                    // background: `${theme.palette.secondary.contrastText} !important`,
                    color: '#9DB8D1',
                    fontWeight: 700,
                    borderRadius: 4,
                }
            }
        },
    },
    select: {
        width: '100%',
        '& .MuiMenuItem-root': {
            minHeight: 48,
        },
        '& .MuiFormLabel-root': {
            fontSize: 11,
        },
        '& .MuiOutlinedInput-input': {
            fontSize: 14,
            backgroundColor: '#EEF7FF',
            borderRadius: 6
        },
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#EEF7FF',
            borderRadius: 6,
            height: 48,
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#EEF7FF',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9DB8D1'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9DB8D1',
                borderWidth: 1,
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                borderColor: 'red',
            },
            // '&.Mui-disabled': {
            //     background: 'gray',
            // },
        },
        '& .MuiMenuItem-gutters': {
            fontSize: 12,
        },
        '& .MuiInputLabel-shrink': {
            color: '#9DB8D1',
            fontSize: 14,
            fontWeight: 400,
            '&.Mui-focused': {
                // color: colors.general.textPrimary,
            }
        },
    },
    selectMulti: {
        width: '100%',
        '& .MuiMenuItem-root': {
            minHeight: 48,
        },
        '& .MuiFormLabel-root': {
            fontSize: '11px',
        },
        '& .MuiOutlinedInput-input': {
            fontSize: 14,
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            paddingTop: 7,
            paddingBottom: 7,
            '& .MuiOutlinedInput-notchedOutline': {
                // borderColor: theme.palette.secondary.light,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                // borderColor: theme.palette.secondary.dark
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                // borderColor: theme.palette.primary.main,
                borderWidth: 1,
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                // borderColor: theme.palette.error.main,
            },
            '&.Mui-disabled': {
                // background: theme.palette.action.disabledBackground,
                // color: colors.general.text,
            },
        },
        '& .MuiMenuItem-gutters': {
            fontSize: 12,
        },
        '& .MuiInputLabel-shrink': {
            // color: colors.general.text,
            fontSize: 14,
            fontWeight: 400,
            '&.Mui-focused': {
                // color: colors.general.textPrimary,
            },
            '&.MuiFormLabel-root.Mui-error': {
                // color: theme.palette.error.main,
            }
        },
    }
}));

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps, maxHeight, height },
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps,
                    style: { maxHeight: maxHeight, height: height }
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchRoundedIcon
                            height='20'
                            width='20'
                            style={{ color: '#9DB8D1' }}
                        />
                    </InputAdornment>
                ),
            }}

            {...TextFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

function IndicatorSeparator() {
    return null
}

function DropdownIndicator() {
    return null
}

const ClearIndicator = props => {
    const {
        getStyles,
        innerProps: { ref, ...restInnerProps },
    } = props;
    return (
        <div
            {...restInnerProps}
            ref={ref}
            style={getStyles('clearIndicator', props)}
        >
            <CancelRoundedIcon style={{ width: 20, maxHeight: 20 }} />
        </div>
    );
};

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
    IndicatorSeparator,
    DropdownIndicator,
    ClearIndicator,
};

// interface Props {
//     label: string;
//     placeholder?: string;
//     options: any [];
//     value: any;
//     style?: any;
//     onChange: (text: string) => void;
//     isClearable?: boolean;
//     required?: boolean;
//     disabled?: boolean;
//     error?: boolean;
//     isMulti?: boolean;
//     id: string;
//     minLength?: number;
//     maxLength?: number;
//     noOptionsMessage?: (text: string) => void;
//     maxHeight?:any;
//     height?: any;
// }
const CustomSearchSelect = (props) => {
    const { style, required, error, label, disabled, isMulti, id, isClearable, value, minLength, maxLength, maxHeight, height } = props;
    const classes = useStyles();
    return (
        <Select
            {...props}
            classes={classes}
            style={{ style, maxHeight: isMulti === false ? 58 : maxHeight, height: isMulti === false ? 58 : height }}
            className={isMulti === true ? classes.selectMulti : classes.select}
            instanceId={id}
            TextFieldProps={{
                label: value ? label : '',
                InputLabelProps: {
                    htmlFor: id,
                    shrink: true,
                },
                variant: 'outlined',
                required,
                error,
                disabled,
            }}
            isDisabled={disabled}
            isClearable={isClearable}
            isMulti={isMulti}
            components={components}
            inputProps={{
                maxLength,
                minLength,
            }}
        // defaultMenuIsOpen={true}
        />
    );
};

export default CustomSearchSelect;
