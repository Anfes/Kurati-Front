import React from 'react';
import { Checkbox } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import { ReactComponent as SVGchecked } from './CheckedIcon/checked.svg';

const useStyles = makeStyles((theme) => ({
    checkBox: {
        color: '#9DB8D1',
        '&.Mui-checked': {
            color: '#4FDFC8',
        },
    },
    checkBoxDisabled: {
        color: '#9DB8D1',
        '&.Mui-checked': {
            color: '#9DB8D1',
        },

    }
}))

const CustomCheckBox = (props) => {
    const { disabled, label, rounded, checked, onChange } = props;
    const classes = useStyles();


    return (
        <div className='flex items-center'>
            <Checkbox
                {...props}
                className={disabled ? classes.checkBoxDisabled : classes.checkBox}
                style={{ padding: 0 }}
                color="primary"
                icon={rounded ? <RadioButtonUncheckedIcon/>: <CheckBoxOutlineBlankIcon/>}
                checkedIcon={rounded ? <RadioButtonCheckedIcon/> : <CheckBoxIcon/>}
                checked={checked}
                onChange={onChange}
            />
            <p
                style={{
                    color: disabled ? '#9DB8D1' : '#243161'
                }}
                className='ml-6 text-14'
            >
                {label}
            </p>
        </div>
    )
}
export default CustomCheckBox;