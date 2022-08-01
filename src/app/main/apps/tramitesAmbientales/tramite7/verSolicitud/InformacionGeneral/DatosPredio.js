import React, { useState } from 'react';
import CustomCheckBox from '@components/CustomCheckBox';
import CustomTextField from '@components/CustomTextField';
import CustomToggleButtons from '@components/CustomToggleButtons';
import { IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import CustomSelect from '@components/CustomSelect';
import CustomFilterSelect from '@components/CustomFilterSelect';
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

const DatosPredio = (props) => {
    const classes = useStyles();
    const {
        formInfoGen,
        changeText,
        changeNumber,
        departamentOptions,
        municipalityOptions,
        mediumScreen,
        verySmallScreen,
        changeFilterSelect
    } = props;

    return (
        <div className='w-full ' style={{ marginRight: 28 }}>
            <Typography className='font-bold text-14 mb-16' style={{ color: '#4C647A' }}>Datos del predio*</Typography>
            <div className="flex flex-col border-1 border-primaryBlack rounded-8 px-28 py-12">
                <div className={mediumScreen ? 'flex flex-row mb-16' : 'flex flex-col '}>

                    <div className={mediumScreen ? 'flex w-1/2' : verySmallScreen ? 'flex w-full my-16' : 'flex flex-col'}>

                        <div className={mediumScreen ? ' w-1/2 mr-12' : verySmallScreen ? 'w-1/2' : 'w-full mb-16'}>
                            <CustomTextField
                                label='Nombre del predio'
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip title='Registrar el nombre del predio solicitante de la concesión de aguas, según lo establece el certificado de libertad y tradición. ' placement='top'>
                                                <IconButton>
                                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                                onChange={changeText("nombrePredio")}
                                value={formInfoGen.nombrePredio}
                            />
                        </div>
                        <div className={mediumScreen ? ' w-1/2 mx-12' : verySmallScreen ? 'w-1/2 ml -12' : 'w-full mb-16'}>
                            <CustomTextField
                                label='Dirección'
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip title='Indicar la localización del predio solicitante de la concesión de aguas.' placement='top'>
                                                <IconButton>
                                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                                onChange={changeText("direccion")}
                                value={formInfoGen.direccion}
                            />
                        </div>
                    </div>
                    <div className={mediumScreen ? 'flex w-1/2 ' : verySmallScreen ? 'flex w-full ' : 'flex flex-col'}>


                        <div className={mediumScreen ? ' w-1/2 mx-12' : verySmallScreen ? 'w-1/2 ml -12' : 'w-full mb-16'}>
                            <CustomFilterSelect
                                value={formInfoGen.departamento}
                                onChange={changeFilterSelect('departamento')}
                                label='Departamento'
                                options={departamentOptions}
                                iconHelp
                                toolTitle='Indicar el Departamento en el que se localiza el predio'
                            />
                        </div>
                        <div className={mediumScreen ? ' w-1/2 ml-12' : verySmallScreen ? 'w-1/2 ml-12' : 'w-full mb-16'}>
                            <CustomFilterSelect
                                value={formInfoGen.municipio}
                                onChange={changeFilterSelect('municipio')}
                                label='Municipio'
                                options={municipalityOptions}
                                iconHelp
                                toolTitle='Indicar el Municipio en el que se localiza el predio.'
                            />
                        </div>

                    </div>

                </div>


                <div className='w-full'>
                    <CustomTextField
                        label='Nombre centro poblado, vereda y/o corregimiento:'
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <Tooltip title=' Para el caso de predios rurales que no cuenten con una
nomenclatura establecida, se deben diligenciar el campo correspondientes a centro poblado y/o corregimiento en donde se localiza el
predio' placement='top'>
                                        <IconButton>
                                            <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                        }}
                        onChange={changeText("vereCorre")}
                        value={formInfoGen.vereCorre}
                    />
                </div>
            </div>


            <Typography className='font-bold text-14 mb-16 mt-28' style={{ color: '#4C647A' }}>Datos economicos*</Typography>
            <div className="flex flex-col border-1 border-primaryBlack rounded-8 px-28 py-12">
                <div className='flex md:flex-row flex-col '>
                    <div className='md:mr-12 md:w-1/2 w-full mb-16'>
                        <CustomTextField
                            label='Actividad económica'
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <Tooltip title='Registre la actividad económica para la cual se requiere aprovechar el recurso hídrico, según lo definido por la DIAN. Consultar la
Clasificacion Industrial Internacional Uniforme de todas las actividades economicas - CIIU en: https://www.dane.gov.co/index.php/sistema-estadistico-nacional-sen/normas-y-estandares/nomenclaturas-y-clasificaciones.' placement='top'>
                                            <IconButton>
                                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                            }}
                            onChange={changeText("actividad")}
                            value={formInfoGen.actividad}
                        />
                    </div>
                    <div className='md:ml-12 md:w-1/2 w-full mb-16'>
                        <CustomTextField
                            label='Código CIIU de la actividad económica (opcional)'
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <Tooltip title='Indique el código CIIU aplicable a la actividad económica desarrollada, con base en lo definido por la cámara de comercio.
Consultar la Clasificacion Industrial Internacional Uniforme de todas las actividades economicas - CIIU en: https://www.dane.gov.co/index.php/sistema-estadistico-nacional-sen/normas-y-estandares/nomenclaturas-y-clasificaciones.' placement='top'>
                                            <IconButton>
                                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                            }}
                            onChange={changeText("ciiu")}
                            value={formInfoGen.ciiu}
                        />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col'>
                    <div className='md:mr-12 md:w-1/4 w-full mb-16'>
                        <CustomTextField
                            label='Costo del proyecto'
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <Tooltip title='Registre el costo total del proyecto en números, con el fin de evaluar las condiciones presupuestales para el cobro del servicio
ambiental por parte de la Autoridad Ambiental Competente, de acuerdo con el artículo 96 de la Ley 633 de 2000 y la Resolución 1280 de 2010.' placement='top'>
                                            <IconButton >
                                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                            }}
                            onChange={changeNumber("costoPro")}
                            value={formInfoGen.costoPro}
                        />
                    </div>
                    <div className='md:ml-12 md:w-3/4 w-full'>
                        <CustomTextField
                            label='Costo del proyecto en letras'
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <Tooltip title='Registre el costo total del proyecto en letras, con el fin de evaluar las condiciones presupuestales para el cobro del servicio
ambiental por parte de la Autoridad Ambiental Competente, de acuerdo con el artículo 96 de la Ley 633 de 2000 y la Resolución 1280 de 2010.' placement='top'>
                                            <IconButton >
                                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                            }}
                            onChange={changeText("costoProLet")}
                            value={formInfoGen.costoProLet}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatosPredio
