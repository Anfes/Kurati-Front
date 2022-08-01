import React from 'react';
import { Radio } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    customCheckDisabled: {
        color: '#9DB8D1 !important',
        '&.Mui-checked': {
            color: '#9DB8D1',
        },
    },
    customRadio: {
        color: '#D1E3F5',
        padding: 0,
        '&.MuiRadio-colorPrimary.Mui-checked': {
            color: '#4FDFC8',
        },
    }
}))

// onChange: () => void;
// disabled: boolean;
// checked: boolean;
// text: string;

const CustomRadioCheck = (props) => {
    const { text, disabled } = props;
    const classes = useStyles();

    return (
        <div className='flex items-center'>
            <Radio
                {...props}
                className={disabled ? classes.customCheckDisabled : classes.customRadio}
                style={{ padding: 0 }}
                color="primary"
            />
            <p
                style={{ color: disabled ? '#9DB8D1' : '#243161' }}
                className='ml-6 text-14'
            >
                {text}
            </p>
        </div>
    )
}
export default CustomRadioCheck;