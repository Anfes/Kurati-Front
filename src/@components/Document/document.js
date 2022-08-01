import React from 'react'
import { makeStyles } from '@mui/styles';
import { Typography, } from '@mui/material';
import clsx from 'clsx';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const useStyles = makeStyles((theme) => ({
    primary: {
        borderWidth: 1,
        borderColor: '#E6F0FA',
        borderRadius: '8px',
        padding: 15

    },
    secundary: {
        borderWidth: 1,
        borderColor: '#E6F0FA',
        borderRadius: '8px',
        boxShadow: "0px 0px 5px 0.1px #004073",
        padding: 15,

    }
}))
const document = (props) => {
    const {className } = props;
    const classes = useStyles();
    const type = className === 'secundary' ? classes.secundary: className === 'primary' ? classes.primary: null
    return (
        <div className={type}>
            <div className='flex'>
                <div className='w-5/6'>
                    <Typography className='font-bold text-16 mb-4'>Document title</Typography>
                    <Typography className='text-10 font-bold' style={{ color: '#9DB8D1' }}>Document description</Typography>
                </div>
                <div className='flex justify-end w-1/6'>
                    <HelpOutlineIcon className='text-16'/>
                </div>
            </div>
        </div>
    )
}

export default document
