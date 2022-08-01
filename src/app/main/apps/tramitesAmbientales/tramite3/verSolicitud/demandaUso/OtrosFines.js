import React from 'react';
import CustomCheckBox from '@components/CustomCheckBox';
import CustomTextField from '@components/CustomTextField';
import { IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const OtrosFines = (props) => {
    const {
        checkedActividad,
        formDemanda,
        changeText,
        smallScreen,
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
                <div className={smallScreen?'flex mb-16':'flex flex-col mb-16'}>
                    <div className={smallScreen?'mr-8':''}>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Uso industrial'
                                rounded
                                checked={formDemanda.tipoActividad === 1 ? true : false}
                                onChange={checkedActividad('usoIndustrial')}

                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Generación térmica o nuclear de electricidad'
                                rounded
                                checked={formDemanda.tipoActividad === 2 ? true : false}
                                onChange={checkedActividad('termicaNuclear')}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Explotación minera y tratamiento de minerales'
                                rounded
                                checked={formDemanda.tipoActividad === 3 ? true : false}
                                onChange={checkedActividad('minera')}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Explotación petrolera'
                                rounded
                                checked={formDemanda.tipoActividad === 4 ? true : false}
                                onChange={checkedActividad('petrolera')}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Inyección para generación geotermica'
                                rounded
                                checked={formDemanda.tipoActividad === 5 ? true : false}
                                onChange={checkedActividad('geotermica')}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Transporte de minerales y sustancias tóxicas'
                                rounded
                                checked={formDemanda.tipoActividad === 6 ? true : false}
                                onChange={checkedActividad('transporteMinerales')}
                            />
                        </div>
                    </div>
                    <div className={smallScreen?'ml-8':''}>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Generación hidroeléctrica'
                                rounded
                                checked={formDemanda.tipoActividad === 7 ? true : false}
                                onChange={checkedActividad('hidroelectrica')}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Generación cinética directa'
                                rounded
                                checked={formDemanda.tipoActividad === 8 ? true : false}
                                onChange={checkedActividad('cineticaDirecta')}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Flotación de maderas'
                                rounded
                                checked={formDemanda.tipoActividad === 9 ? true : false}
                                onChange={checkedActividad('maderas')}
                            />
                        </div>
                        <div className='mb-10'>
                            <CustomCheckBox
                                label='Usos medicinales'
                                rounded
                                checked={formDemanda.tipoActividad === 10 ? true : false}
                                onChange={checkedActividad('medicinales')}
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
