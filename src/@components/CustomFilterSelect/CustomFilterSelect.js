
import { makeStyles } from '@mui/styles';
import React, { Component } from 'react'
import Select, { components } from 'react-select'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton, InputLabel, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const customStyles = {

    control: (base, state) => ({
        width: '100%',
        display: 'flex',
        minHeight: 43,
        border: state.isFocused ? '1px solid #145C9C' :
            state.isDisabled ? '1px solid #BDD7EF' :
                '1px solid #BDD7EF',
        borderRadius: 6,
        cursor: 'pointer',
        background: state.isDisabled ? '#F9FCFF':'white',
        color: state.isDisabled ? '#9DB8D1':'',
        "&:hover": {
            borderColor: state.isFocused ? '#145C9C' : '#023E73',
        },
    }),


    indicatorSeparator: () => ({
        display: 'none'
    }),

    placeholder: () => ({
        color: '#023E73',
        fontWeight: 400,
        fontSize: 12,
        gridArea: '1/1/2/3',
        marginLeft: 2,
        marginRight: 2,
        boxSizing: 'borderBox',
    }),
    menu: (base, state) => ({
        ...base,
        zIndex: 20,
        borderRadius: 8,
        padding: 10,
        boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);'
    }),
    option: (base, state) => ({
        ...base,
        padding: 10,
        fontWeight: 400,
        color: '#023E73',
        fontSize: 12,
        marginLeft: 4,
        marginRight: 8,
        backgroundColor: 'transparent',

        '&:hover': {
            borderRadius: 4,
            backgroundColor: '#D0E9FF',
            color: '#023E73',
            fontWeight: 500
        },
    }),

}


const DropdownIndicator = (props) => {

    return (
        <components.DropdownIndicator {...props}>
            {props.isFocused ? <ArrowDropUpIcon style={{ color: '#023E73' }} /> : <ArrowDropDownIcon style={{ color: '#023E73' }} />}
        </components.DropdownIndicator>
    );
};

const CustomFilterSelect = (props) => {
    const { value, label, onChange, options, iconHelp, toolTitle, disabled } = props;

    return (
        <div >
            {value !== '' ?
                <div className='absolute bg-white  z-20 flex items-center' style={{ marginTop: '-9.2px', marginLeft: 10, }}>

                    <InputLabel
                        style={{ color: '#145C9C', fontSize: 9, fontWeight: 400 }} >{label}</InputLabel>
                    {iconHelp ?
                        <Tooltip title={toolTitle} placement='top'>
                            <IconButton className='p-0 ml-2'>
                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                            </IconButton>
                        </Tooltip>
                        : null}

                </div>
                :
                iconHelp ?
                    <div className='absolute   z-20 flex' style={{ marginLeft: 120, marginTop: 10 }}>
                        <Tooltip title={toolTitle} placement='top'>
                            <IconButton className='p-0 ml-2'>
                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    : null}
            <Select options={options}
                styles={customStyles}
                placeholder={label}
                components={{ DropdownIndicator }}
                value={value}
                onChange={onChange}
                isDisabled={disabled}
            />
        </div>
    )
};

export default CustomFilterSelect;
