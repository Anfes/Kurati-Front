import CustomTextField from '@components/CustomTextField';
import CustomToggleButtons from '@components/CustomToggleButtons';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import React from 'react';

const OtrosDatos = (props) => {
    const {
        formDemanda,
        changeNumber,
        changeTiempo,
        changeTipoAnexo,
    } = props;

    return (
        <div className="flex flex-col w-full">
            <div className="flex border-1 border-primaryBlack rounded-t-8 p-28 w-full items-center">
                <Typography
                    className="font-bold text-14 mr-8"
                    style={{ color: "#4C647A" }}
                >
                    Otros datos:
                </Typography>

            </div>
            <div className="border-1 border-primaryBlack rounded-b-8 p-28 w-full ">
                <div className='w-full mb-16'>
                    <CustomTextField
                        label='Cantidad de agua que solicita (l/s)*'
                        onChange={changeNumber('cantidadAgua')}
                        value={formDemanda.cantidadAgua}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <Tooltip
                                        title='Ingrese la información de la cantidad de agua que considere necesaria utilizar en litros por segundo, con el fin de que la
                                        Autoridad Ambiental competente corrobore el módulo de consumo, disponibilidad del recurso hídrico y las condiciones ambientales de la fuente, para autorizar el
                                        aprovechamiento del agua. '
                                        placement='top'>
                                        <IconButton className='p-0'>
                                            <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                        }}
                    />
                </div>
                <div className='flex mb-16'>
                    <div className='mr-8 w-full'>
                        <CustomTextField
                            label='Tiempo por el cual se solicita la concesión'
                            onChange={changeNumber('tiempoConcesion')}
                            value={formDemanda.tiempoConcesion}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <Tooltip
                                            title='indique el tiempo por el cual solicita la concesión, en meses o años.'
                                            placement='top'>
                                            <IconButton className='p-0'>
                                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                            }}
                        />
                    </div>
                    <div className='ml-8'>
                        <CustomToggleButtons
                            labelLeft='Meses'
                            labelRight='Años'
                            open={changeTiempo('ano')}
                            close={changeTiempo('mes')}
                            selectedLeft={formDemanda.mesAno === 1 ? true : false} // mes
                            selectedRight={formDemanda.mesAno === 2 ? true : false} // año
                        />
                    </div>
                </div>
                <div>
                    <Typography className='mb-16 font-semibold' style={{ color: '#145C9C' }}>Tipo de Programa de Uso Eficiente y Ahorro del Agua:
                        <Tooltip
                            title='Indique si se adjunta a la solicitud el PUEAA o el PUEAA simplificado, de
                            acuerdo con lo establecido en el artículo 2.2.3.2.1.1.3. del Decreto 1076 de 2015.'
                            placement='top'>
                            <IconButton className='p-0 mx-16'>
                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <div className='flex items-center'>
                        <Typography className='mr-8'>Tipo de PUEAA que va a presentar en los anexos:</Typography>
                        <div className='ml-8'>
                            <CustomToggleButtons
                                labelLeft='PUEAA'
                                labelRight='PUEAA simplificado'
                                open={changeTipoAnexo('PUEAA simplificado')}
                                close={changeTipoAnexo('PUEAA')}
                                selectedLeft={formDemanda.tipoAnexo === 1 ? true : false} // PUEAA
                                selectedRight={formDemanda.tipoAnexo === 2 ? true : false} // PUEAA simplificado
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OtrosDatos;
