import React, { useState } from 'react'
import CustomFilterSelect from '@components/CustomFilterSelect';
import CustomSelect from '@components/CustomSelect';
import CustomTextField from '@components/CustomTextField';
import CustomToggleButtons from '@components/CustomToggleButtons';
import { IconButton, Tooltip, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    helpBox: {
        borderRadius: 8,
        padding: 10,
        boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
        position: 'absolute',
        zIndex: 50,
        backgroundColor: 'white'
    }
})
)

const LegalRep = (props) => {
    const classes = useStyles();
    const {
        documentTypeOptions,
        cityOptions,
        expeditionPlaceOptions,
        form,
        changeText,
        changeFilterSelect,
        changeNumber,
        emailCorrectRep,
        errorRep,
        legalRep,
        onChangeEmail
    } = props;


    return (

        <div >
            <Typography className='font-bold text-14 mb-16' style={{ color: '#4C647A' }}>Representante legal*</Typography>
            <div className="flex flex-col border-1 border-primaryBlack rounded-8 px-28 py-12">
                <div className="flex sm:flex-row flex-col sm:my-16 mb-16">
                    <div className='flex'>
                        <Typography className='my-12 mr-8 font-bold text-14 mb-16' style={{ color: '#4C647A' }}>¿Representante legal o Apoderado?</Typography>
                        <Tooltip title='Digitar los nombres y apellidos del representante legal o el apoderado (si aplica) del solicitante, su tipo y
                                        número de identificación (CC o CE) e información de contacto.' placement='top'>
                            <IconButton>
                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className='sm:mx-12'>
                        <CustomToggleButtons
                            labelLeft='Representante Legal'
                            labelRight='Apoderado'
                            open={legalRep('apoderado')}
                            close={legalRep('representante')}
                            selectedLeft={form.repOrApo === 1 ? true : false}
                            selectedRight={form.repOrApo === 2 ? true : false}
                        />
                    </div>
                </div>
                <div className='md:my-16 my-8 md:my-0' style={{ width: "100%" }}>
                    <CustomTextField
                        onChange={changeText("nameRep")}
                        value={form.nameRep}
                        label="Nombre del representante legal"
                    />
                </div>
                <div className="flex md:flex-row flex-col justify-between w-full md:my-16">
                    <div className="md:w-1/3 w-full md:mr-12 my-8 md:my-0">
                        <CustomSelect
                            value={form.documentTypeRep}
                            onChange={changeText('documentTypeRep')}
                            name='documentType'
                            label='Tipo de documento'
                            options={documentTypeOptions}

                        />
                    </div>
                    <div className="md:w-1/3 md:mx-12 my-8 md:my-0" >
                        <CustomTextField
                            onChange={changeNumber('documentNumberRep')}
                            value={form.documentNumberRep}
                            label="Número de documento"
                        />
                    </div>
                    <div className="md:w-1/3 md:ml-12 my-8 md:my-0">
                        <CustomFilterSelect
                            value={form.expeditionPlaceRep}
                            onChange={changeFilterSelect('expeditionPlaceRep')}
                            name='expeditionPlace'
                            label='Lugar de expedición'
                            options={expeditionPlaceOptions}
                        />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col justify-between w-full md:my-16">
                    <div className="md:w-1/2 md:mr-12 my-8 md:my-0">
                        <CustomTextField
                            onChange={changeText("addressRep")}
                            value={form.addressRep}
                            label="Dirección"
                        />
                    </div>
                    <div className="md:w-1/2 md:ml-12 my-8 md:my-0">
                        <CustomFilterSelect
                            value={form.cityRep}
                            onChange={changeFilterSelect('cityRep')}
                            name='city'
                            label='Ciudad'
                            options={cityOptions}
                        />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col justify-between md:my-16">
                    <div className="md:w-1/2 md:mr-12 my-8 md:my-0">
                        <CustomTextField
                            onChange={changeNumber('phoneRep')}
                            value={form.phoneRep}
                            label="Telefono"
                        />
                    </div>
                    <div className="md:w-1/2 md:ml-12 my-8 md:my-0">
                        <CustomTextField
                            label='Fax (opcional)'
                            value={form.faxRep}
                            onChange={changeNumber('faxRep')}
                        />
                    </div>
                </div>
                <div className="w-full md:my-16 my-8 md:my-0">
                    <CustomTextField
                        onChange={onChangeEmail('emailRep')}
                        value={form.emailRep}
                        label="Email"
                        error={emailCorrectRep === false && form.emailRep !== '' ? errorRep : null}
                        helperText={emailCorrectRep === false && errorRep ? "Ingrese un email valido" : ''}
                    />
                </div>
            </div>
        </div>

    )
}

export default LegalRep
