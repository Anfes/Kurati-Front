import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #F9FCFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        // maxWidth: 1000,
        borderRadius: 8,
        margin: 8,
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 10,
        background:'#F9FCFF'
    },
}))

const CustomDocumentsList = (props) => {
    const { title, description, content, documents } = props;
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className='flex items-center'>
                <div style={{ color: '#4C647A' }} className='mr-24 w-360'>
                    <p className='font-bold text-14'>
                        {title}
                    </p>
                    <p className='mt-10 text-14'>
                        {description}
                    </p>
                </div>
                <div className='ml-32 overflow-auto max-h-60'>
                    {documents}
                </div>
            </div>
            {content}
        </div>
    );
}

export default CustomDocumentsList;
