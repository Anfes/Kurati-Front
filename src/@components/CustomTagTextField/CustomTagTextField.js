import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createStyles, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const useStyles = makeStyles((theme) => ({
    prueba: {
        '&:placeholder': {
            background: '#2E7EC5',
            textDecoration: 'none',
            color: 'blue',

        },
    }
})
)
const CustomTagTextField = (props) => {
    const { tags, setTags, disabled } = props;
    const [input, setInput] = useState('')
    const [focused, setFocused] = useState(false)
    const classes = useStyles(props);
    const searchInput = useRef(null)

    const inputChange = (event) => {
        setInput(event.target.value)
    }

    const key = (event) => {
        if (event.keyCode === 13) {
            if (input !== '') {
                setTags(tags.concat(input))
                setInput('')
            }
        }
    }
    const deleteItem = (i) => () => {
        const newTags = [...tags];
        newTags.splice(i, 1)
        setTags(newTags);
    }

    return (

        <div className=' rounded-4 p-12 flex items-center ' style={disabled ? {
            background: '#F9FCFF',
            color: '#9DB8D1',
            border: '1px solid #BDD7EF',
            minHeight: 56
        } : { border: focused ? '    1px solid #145C9C' : '1px solid #BDD7EF', minHeight: 56 }}>
            <div className='flex flex-wrap m-2' style={tags.length === 0 ?{width:'100%'}:{}}>
                {tags.map(function (tag, i) {
                    return (
                        <div className='rounded-full py-8 px-4 flex items-center h-32 m-2' style={{ backgroundColor: '#D0E9FF', width: 'fit-content' }}>
                            <Typography className='font-bold text-11 text-primary mx-4'>{tag}</Typography>
                            <IconButton onClick={deleteItem(i)} className='rounded-full flex justify-center items-center p-4 bg-primary mr-4'>
                                <CloseRoundedIcon className='text-11 text-secondary' />
                            </IconButton>
                        </div>
                    )
                })}
                <div className={tags.length === 0 ?'flex flex-wrap m-2 w-full ':'flex flex-wrap m-2 '}>
                    <input
                        type='text'
                        value={input}
                        onChange={inputChange}
                        onKeyDown={(e) => key(e)}
                        placeholder='Animales'
                        ref={searchInput}
                        disabled={disabled || false}
                        style={{ backgroundColor: 'transparent', fontSize: 14, width:'100%' }}
                        className={classes.prueba}
                    />
                </div>
            </div>

        </div>

    )

};
CustomTagTextField.propType = {
    disabled: PropTypes.bool,
};

export default CustomTagTextField;
