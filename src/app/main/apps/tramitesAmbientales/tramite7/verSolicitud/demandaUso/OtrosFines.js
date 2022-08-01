import React, { useEffect, useState } from 'react';
import CustomCheckBox from '@components/CustomCheckBox';
import CustomTextField from '@components/CustomTextField';
import CustomToggleButtons from '@components/CustomToggleButtons';
import { Divider, IconButton, InputAdornment, Tooltip, Typography, useMediaQuery } from '@mui/material';
import CustomSelect from '@components/CustomSelect';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const OtrosFines = (props) => {
    const {
        formDemanda,
        changeText,
        checkedUso
    } = props;

    return (
        <div className="flex flex-col w-full">
            <div className="flex border-1 border-primaryBlack rounded-t-8 p-28 w-full items-center">
                <Typography
                    className="font-bold text-14 mr-8"
                    style={{ color: "#4C647A" }}
                >
                    Otros fines de uso
                </Typography>
                <Tooltip
                    title='Dentro de esta categoría marque la opción correspondiente de acuerdo con la actividad a desarrollar: Uso industrial, Generación
                        térmica o nuclear de electricidad, Explotación minera y tratamiento de minerales, Explotación petrolera, Inyección para generación geotérmica, Generación
                        hidroeléctrica, Generación cinética directa, Flotación de maderas, Transporte de minerales y sustancias tóxicas, Acuicultura y pesca, Recreación y deportes, Usos
                        medicinales y Otros usos similares.'
                    placement='top'>
                    <IconButton className='p-0'>
                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="border-1 border-primaryBlack rounded-b-8 p-28 w-full ">
                <div className='mb-'>
                    <Typography
                        style={{ color: '#145C9C' }}
                        className="font-bold tex-12 mb-16"
                    >
                        Tipos de actividad :
                    </Typography>
                </div>
                <div className='flex mb-16'>
                    <div className='mr-8'>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Uso industrial'
                                rounded
                                checked={formDemanda.tipoActividad === 1 ? true : false}
                                onChange={checkedUso(1)}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Generación térmica o nuclear de electricidad'
                                rounded
                                checked={formDemanda.tipoActividad === 2 ? true : false}
                                onChange={checkedUso(2)}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Explotación minera y tratamiento de minerales'
                                rounded
                                checked={formDemanda.tipoActividad === 3 ? true : false}
                                onChange={checkedUso(3)}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Explotación petrolera'
                                rounded
                                checked={formDemanda.tipoActividad === 4 ? true : false}
                                onChange={checkedUso(4)}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Inyección para generación geotermica'
                                rounded
                                checked={formDemanda.tipoActividad === 5 ? true : false}
                                onChange={checkedUso(5)}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Transporte de minerales y sustancias tóxicas'
                                rounded
                                checked={formDemanda.tipoActividad === 6 ? true : false}
                                onChange={checkedUso(6)}
                            />
                        </div>
                    </div>
                    <div className='ml-8'>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Generación hidroeléctrica'
                                rounded
                                checked={formDemanda.tipoActividad === 7 ? true : false}
                                onChange={checkedUso(7)}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Generación cinética directa'
                                rounded
                                checked={formDemanda.tipoActividad === 8 ? true : false}
                                onChange={checkedUso(8)}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Flotación de maderas'
                                rounded
                                checked={formDemanda.tipoActividad === 9 ? true : false}
                                onChange={checkedUso(9)}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Usos medicinales'
                                rounded
                                checked={formDemanda.tipoActividad === 10 ? true : false}
                                onChange={checkedUso(10)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <CustomTextField
                        label='Descripción del fin de uso seleccionado (Otros fines de uso)'
                        multiline
                        onChange={changeText('descripcionFinUso')}
                        value={formDemanda.descripcionFinUso}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton  >
                                        <Tooltip
                                            title='Describa la opción que marcó anteriormente'
                                            placement='top'>
                                            <IconButton className='p-0'>
                                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default OtrosFines
