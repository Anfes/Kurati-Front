import React from 'react';
import CustomCheckBox from '@components/CustomCheckBox';
import CustomSelect from '@components/CustomSelect';
import CustomTextField from '@components/CustomTextField';
import CustomToggleButtons from '@components/CustomToggleButtons';
import { Grid, Typography, InputAdornment, IconButton } from '@mui/material';
import CustomFilterSelect from '@components/CustomFilterSelect';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';

const DatosSolicitante = (props) => {
    const {
        typePerson,
        checkPub,
        changeText,
        form,
        documentTypeOptions,
        changeNumber,
        cityOptions,
        emailCorrect,
        error,
        changeFilterSelect,
        onChangeEmail,
        checkCal,
        changeEmailnot,
    } = props;

    return (
        <div>
            <Typography className='font-bold text-14 mb-16' style={{ color: '#4C647A' }}>Datos del solicitante:</Typography>
            <div className="flex flex-col border-1 border-primaryBlack rounded-8 px-28 py-12">
                <div className="flex sm:flex-row flex-col my-8">
                    <Typography className='sm:mx-12 mx-0 sm:mt-14'>Tipo de persona</Typography>
                    <div className='sm:mx-12 mx-0 sm:my-0 my-8'>
                        <CustomToggleButtons
                            labelLeft='Natural'
                            labelRight='Jurídica'
                            open={typePerson('juridica')}
                            close={typePerson('natural')}
                            selectedLeft={form.personType === 1 ? true : false}
                            selectedRight={form.personType === 2 ? true : false}
                        />
                    </div>
                    {form.personType === 2 ?
                        <div className='flex sm:mx-12 mx-0 my-8'>
                            <div className='sm:mx-14 mr-8'>
                                <CustomCheckBox
                                    label='Pública'
                                    rounded
                                    checked={form.personType2 === 1 ? true : false}
                                    onChange={checkPub('publica')}
                                />
                            </div>
                            <div className='sm:mx-14 mx-0'>
                                <CustomCheckBox
                                    label='Privada'
                                    rounded
                                    checked={form.personType2 === 2 ? true : false}
                                    onChange={checkPub('privada')}
                                />
                            </div>
                        </div>
                        : null}
                </div>
                <div className='md:my-8 my-8 md:my-0' style={{ width: "100%" }}>
                    <CustomTextField
                        onChange={changeText("businessName")}
                        value={form.businessName}
                        label="Nombre o razón social"
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <Tooltip title=' Indicar el nombre o razón social del solicitante ' placement='top'>

                                        <IconButton>
                                            <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                        }}
                    />
                </div>
                <div className="flex md:flex-row flex-col justify-between w-full  md:my-8">
                    <div className="md:w-1/2 w-full md:mr-12 my-8 md:my-0" >
                        <CustomSelect
                            value={form.documentType}
                            onChange={changeText("documentType")}
                            name='documentType'
                            label='Tipo de documento'
                            options={documentTypeOptions}
                        />
                    </div>
                    <div className="md:w-1/2 md:ml-12 my-8 md:my-0">
                        <CustomTextField
                            onChange={changeNumber('documentNumber')}
                            value={form.documentNumber}
                            label="Número de documento"
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <Tooltip title='Señalar si el tipo de identificación es cédula de ciudadanía, número de identificación
                                                        tributaria (NIT), personería jurídica, cédula de extranjería o pasaporte, con su respectivo número.'
                                            placement='top'
                                        >
                                            <IconButton  >
                                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                            }}
                        />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col justify-between w-full md:my-8">
                    <div className="md:w-1/2 md:mr-12 my-8 md:my-0">
                        <CustomTextField
                            onChange={changeText("address")}
                            value={form.address}
                            label="Dirección"
                        />
                    </div>
                    <div className="md:w-1/2 md:ml-12 my-8 md:my-0">
                        <CustomFilterSelect
                            value={form.city}
                            onChange={changeFilterSelect('city')}
                            name='city'
                            label='Ciudad'
                            options={cityOptions}
                        />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col justify-between md:my-8">
                    <div className="md:w-1/2 md:mr-12 my-8 md:my-0">
                        <CustomTextField
                            onChange={changeNumber('phone')}
                            value={form.phone}
                            label="Telefono"
                        />
                    </div>
                    <div className="md:w-1/2 md:ml-12 my-8 md:my-0" >
                        <CustomTextField
                            onChange={changeNumber('fax')}
                            label='Fax (opcional)'
                            value={form.fax}
                        />
                    </div>
                </div>
                <div className="w-full md:my-8 my-8 md:my-0">
                    <CustomTextField
                        onChange={onChangeEmail('email')}
                        value={form.email}
                        label="Correo electrónico"
                        error={emailCorrect === false && form.email !== '' ? error : null}
                    />
                </div>
                <div className='mb-16'>
                    <Typography className='font-bold text-14 my-12'>¿Autoriza la notificación mediante correo electrónico?</Typography>
                    <div className='flex sm:flex-row flex-col  items-center'>
                        <div className='sm:mr-12 sm:mb-0 mb-12'>
                            <CustomToggleButtons
                                labelLeft='Si'
                                labelRight='No'
                                open={changeEmailnot('no')}
                                close={changeEmailnot('si')}
                                selectedLeft={form.autNot === 1 ? true : false}
                                selectedRight={form.autNot === 0 ? true : false}
                            />
                        </div>
                        {form.autNot === 1 ? 
                        <div className=" md:ml-12 w-full" >
                            <CustomTextField
                                onChange={changeText('addressNot')}
                                label='Indique el correo electrónico de notificación'
                                value={form.addressNot}
                            />
                        </div>
                        :
                        <div className=" md:ml-12 w-full" >
                            <CustomTextField
                                onChange={changeText('addressNot')}
                                label='Indique la dirección para notificación física'
                                value={form.addressNot}
                            />
                        </div>
                    }
                    </div>
                </div>
                <div className='flex'>
                    <div className='flex mr-16'>
                        <Typography className='font-bold text-14 my-12' style={{ color: '#4C647A' }}>Calidad en la que actúa:</Typography>
                        <Tooltip
                            title=' Indicar si el solicitante actúa en calidad de propietario, tenedor o
                                    poseedor del predio, según sea el caso, de acuerdo con el artículo 2.2.3.2.9.2 del Decreto 1076 de 2015 y 
                                    el Código Civil Colombiano.'
                            placement='top'
                        >
                            <IconButton>
                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Grid item className="flex sm:flex-row flex-col my-14 mr-12">
                        <div className="mr-16  sm-w-auto">
                            <CustomCheckBox
                                label='Propietario'
                                rounded
                                checked={form.calAct === 1 ? true : false}
                                onChange={checkCal('propietario')}
                            />
                        </div>
                        <div className="sm:mx-16 sm-w-auto">
                            <CustomCheckBox
                                label='Poseedor'
                                rounded
                                checked={form.calAct === 2 ? true : false}
                                onChange={checkCal('poseedor')}
                            />
                        </div>
                        <div className="sm:ml-16 sm-w-auto">
                            <CustomCheckBox
                                label='Tenedor'
                                rounded
                                checked={form.calAct === 3 ? true : false}
                                onChange={checkCal('tenedor')}
                            />

                        </div>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default DatosSolicitante
