import React, { useState } from 'react';
import CustomCheckBox from '@components/CustomCheckBox';
import CustomTextField from '@components/CustomTextField';
import CustomToggleButtons from '@components/CustomToggleButtons';
import { Divider, IconButton, InputAdornment, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import CustomSelect from '@components/CustomSelect';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CustomButton from '@components/CustomButton';
import { TrashIcon } from '@components/FuseSvgIcon';
import CustomUploadFile from '@components/CustomUploadFile';
import { MobileDatePicker } from '@mui/lab';

const InfoPuntoCaptacion = (props) => {
    const largeScreen = useMediaQuery('(min-width:1600px)')
    const {
        formInfoCap,
        changeNumberCoor,
        checkedPuntoAgua,
        changeText,
        changePuntoAgua,
        changeNumber,
        changeServidumbre,
        changeDate,
        changeInforme,
        coordenada,
        arrayCoor,
        addCoordenada,
        deleteItem,
        disabled,
    } = props;
const [croquis, setCroquis] = useState([]);
    return (
        <div className='w-full'>
            <Typography className='font-bold text-14 mb-16' style={{ color: '#4C647A' }}>Información del punto de captación :</Typography>

            <div className="flex flex-col border-1 border-primaryBlack rounded-8 px-28 py-12 w-full " style={{ marginRight: 28 }}>
                <div className='mb-32'>
                    <div className={largeScreen ? 'flex  w-full mb-16' : 'flex flex-col'}>
                        <Typography className='font-semibold text-14 mr-16' style={{ color: '#145C9C' }}>Tipo de punto de agua:</Typography>
                        <div className='flex w-full justify-between items-center'>
                            <div className='flex'>
                                <CustomCheckBox
                                    label='Manantial'
                                    rounded
                                    checked={formInfoCap.tipoPuntoAgua === 1 ? true : false}
                                    onChange={checkedPuntoAgua('manantial')}
                                />
                                <Tooltip
                                    title='Surgencia superficial de agua de origen subterráneo que se produce a través de planos de estratificación, discontinuidades de las rocas como fracturas,
                                rocas o cambios de litología en lugares donde la superficie topográfica corta el nivel freático. Se consideran concesiones de fuentes subterráneas a manantiales,
                                aquellas en las cuáles la captación sea en el sitio de afloramiento (artículo 149 del Decreto-Ley 2811 de 1974).'
                                    placement='top'>
                                    <IconButton className='p-0 mx-16'>
                                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className='flex mx-16'>
                                <CustomCheckBox
                                    label='Aljibe'
                                    rounded
                                    checked={formInfoCap.tipoPuntoAgua === 2 ? true : false}
                                    onChange={checkedPuntoAgua('aljibe')}
                                />
                                <Tooltip
                                    title='excavación manual de gran diámetro que alcanza la tabla de agua o nivel freático y se profundiza por debajo de esta para acumular agua subterránea que
                                está disponible para ser bombeada o extraída.'
                                    placement='top'>
                                    <IconButton className='p-0 mx-16'>
                                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className='flex mx-16'>
                                <CustomCheckBox
                                    label='Pozo'
                                    rounded
                                    checked={formInfoCap.tipoPuntoAgua === 3 ? true : false}
                                    onChange={checkedPuntoAgua('pozo')}
                                />
                                <Tooltip
                                    title='Agujero o perforación mecánica, excavado o taladrado en la tierra para extraer agua.'
                                    placement='top'>
                                    <IconButton className='p-0 mx-16'>
                                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className='flex mx-16'>
                                <CustomCheckBox
                                    label='Agua residual'
                                    rounded
                                    checked={formInfoCap.tipoPuntoAgua === 4 ? true : false}
                                    onChange={checkedPuntoAgua('residual')}
                                />
                                <Tooltip
                                    title='Son las aguas ya utilizadas o servidas, de origen doméstico o no doméstico.'
                                    placement='top'>
                                    <IconButton className='p-0 mx-16'>
                                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className='flex mx-16'>
                                <CustomCheckBox
                                    label='Otro'
                                    rounded
                                    checked={formInfoCap.tipoPuntoAgua === 5 ? true : false}
                                    onChange={checkedPuntoAgua('otro')}
                                />
                                <Tooltip
                                    title=' Otros puntos de aguas subterráneas incluyendo drenes, infiltraciones en obras subterráneas, entre otros'
                                    placement='top'>
                                    <IconButton className='p-0 mx-16'>
                                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className='ml-16 w-1/4'>
                                {formInfoCap.tipoPuntoAgua === 5 ?
                                    <CustomTextField
                                        label='¿Cual?'
                                        value={formInfoCap.otroCual}
                                        onChange={changeText('otroCual')}
                                    />
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-32'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <Typography style={{ color: '#145C9C' }} className='font-semibold text-14 mr-16'>Puntos de agua</Typography>
                            <Tooltip
                                title='Indicar si el punto de agua definido es nuevo o existente. Esta campo no debe ser diligenciado cuando se seleccione la opción "Manantial" en el
                                campo anterior.'
                                placement='top'>
                                <IconButton className='p-0 mx-16'>
                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className='mr-24'>
                            <CustomToggleButtons
                                labelLeft='Nuevo'
                                labelRight='Existente'
                                open={changePuntoAgua('existente')}
                                close={changePuntoAgua('nuevo')}
                                selectedLeft={formInfoCap.puntoAgua === 1 ? true : false}
                                selectedRight={formInfoCap.puntoAgua === 2 ? true : false}
                            />
                        </div>
                        <div className='w-3/4'>
                            <CustomTextField
                                label='Nombre del punto'
                                value={formInfoCap.nombrePunto}
                                onChange={changeText('nombrePunto')}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip title='Especificar el calificativo ó código del punto de aprovechamiento para identificarlo en la base de datos regional o local. ' placement='top'>
                                                <IconButton>
                                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-32'>
                    <div className='flex mb-16'>
                        <Typography className='font-semibold text-14 mr-16' style={{ color: '#145C9C', }}>
                            Coordenadas geográficas del punto de captación en sistema de referencia <a className='no-underline'
                                href='https://www.igac.gov.co/es/contenido/areas-estrategicas/magna-sirgas'
                                style={{ color: '#1915F0', backgroundColor: 'transparent' }} target="_blank">Magna Sirgas</a> (opcional):
                        </Typography>
                        <Tooltip
                            title='especificar las coordenadas geográficas del punto de captación en sistema de referencia MAGNA SIRGAS. Es necesario registrar la latitud, longitud y altitud, con el
                                fin de facilitar la compatibilidad e interoperabilidad con las técnicas actuales de georreferenciación, en especial con los Sistemas Globales de Navegación por
                                Satélite (SGNS), de acuerdo con el IGAC (Ver Resoluciones 471 y 529 de 2020, Resolución 955 de 2012, Decreto 303 de 2012 y Resolución 068 de 2005, o
                                aquellas que las modifiquen, adicionen o sustituyan).
                                '
                            placement='top'>
                            <IconButton className='p-0 mx-16'>
                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="flex flex-col border-1 border-primaryBlack rounded-8 px-28 py-12 w-full ">
                        <div className='flex mb-16'>
                            <div className='w-3/4 mr-8 flex'>
                                <div style={{ backgroundColor: '#EEF7FF' }} className='w-1/2 h-60 flex justify-center items-center mr-8'>
                                    <Typography className='text-18 text-primary font-bold'>Latitud</Typography>
                                </div>
                                <div style={{ backgroundColor: '#EEF7FF' }} className='w-1/2 h-60 flex justify-center items-center ml-8'>
                                    <Typography className='text-18 text-primary font-bold'>Longitud</Typography>
                                </div>
                            </div>
                            <div className='w-1/4 ml-8 flex'>
                                <div style={{ backgroundColor: '#EEF7FF' }} className='w-1/2 h-60 flex justify-center items-center mr-8'>
                                    <Typography className='text-18 text-primary font-bold'>Altitud</Typography>
                                </div>
                                <div className='w-1/2 ml-8' />
                            </div>
                        </div>
                        <div className='flex mb-16'>
                            <div className='w-3/4 mr-8 flex'>
                                <div className='w-1/2 flex mr-8'>
                                    <div className='mr-8 w-full'>
                                        <CustomTextField
                                            label='Grados'
                                            style={{ minWidth: 0 }}
                                            value={coordenada.tipc_lat_grad}
                                            onChange={changeNumberCoor('tipc_lat_grad')}
                                        />
                                    </div>
                                    <div className='mx-8 w-full'>
                                        <CustomTextField
                                            label='Minutos'
                                            style={{ minWidth: 0 }}
                                            value={coordenada.tipc_lat_min}
                                            onChange={changeNumberCoor('tipc_lat_min')}
                                        />
                                    </div>
                                    <div className='ml-8 w-full'>
                                        <CustomTextField
                                            label='Segundos'
                                            style={{ minWidth: 0 }}
                                            value={coordenada.tipc_lat_seg}
                                            onChange={changeNumberCoor('tipc_lat_seg')}
                                        />
                                    </div>
                                </div>
                                <div className='w-1/2 flex justify-center items-center ml-8'>
                                    <div className='mr-8 w-full'>
                                        <CustomTextField
                                            label='Grados'
                                            style={{ minWidth: 0 }}
                                            value={coordenada.tipc_lon_grad}
                                            onChange={changeNumberCoor('tipc_lon_grad')}
                                        />
                                    </div>
                                    <div className='mx-8 w-full'>
                                        <CustomTextField
                                            label='Minutos'
                                            style={{ minWidth: 0 }}
                                            value={coordenada.tipc_lon_min}
                                            onChange={changeNumberCoor('tipc_lon_min')}
                                        />
                                    </div>
                                    <div className='ml-8 w-full'>
                                        <CustomTextField
                                            label='Segundos'
                                            style={{ minWidth: 0 }}
                                            value={coordenada.tipc_lon_seg}
                                            onChange={changeNumberCoor('tipc_lon_seg')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/4 ml-8 flex'>
                                <div className='w-1/2 flex justify-center items-center mr-8'>

                                    <CustomTextField
                                        label='Grados'
                                        style={{ minWidth: 0 }}
                                        value={coordenada.tipc_alt}
                                        onChange={changeNumberCoor('tipc_alt')}
                                    />

                                </div>
                                <div className='w-1/2 ml-8 flex items-center'>
                                    <CustomButton
                                        width='full'
                                        height='medium'
                                        label='Agregar'
                                        className='secondary'
                                        onClick={addCoordenada(coordenada)}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>
                        {arrayCoor.length > 0 ? arrayCoor.map((coord, i) => {
                            return (
                                <div>
                                    <Divider style={{ borderColor: '#D1E3F5' }} />
                                    <div className='flex mb-16 mt-12'>
                                        <div className='w-3/4 mr-8 flex'>
                                            <div className='w-1/2 flex mr-8'>
                                                <div className='mr-8 w-full flex justify-center items-center'>
                                                    <Typography style={{ color: '#647F97' }}>{coord.tipc_lat_grad}</Typography>
                                                </div>
                                                <div className='mx-8 w-full flex justify-center items-center'>
                                                    <Typography style={{ color: '#647F97' }}>{coord.tipc_lat_min}</Typography>
                                                </div>
                                                <div className='ml-8 w-full flex justify-center items-center'>
                                                    <Typography style={{ color: '#647F97' }}>{coord.tipc_lat_seg}</Typography>
                                                </div>
                                            </div>
                                            <div className='w-1/2 flex justify-center items-center ml-8'>
                                                <div className='mr-8 w-full flex justify-center items-center'>
                                                    <Typography style={{ color: '#647F97' }}>{coord.tipc_lon_grad}</Typography>
                                                </div>
                                                <div className='mx-8 w-full flex justify-center items-center'>
                                                    <Typography style={{ color: '#647F97' }}>{coord.tipc_lon_min}</Typography>
                                                </div>
                                                <div className='ml-8 w-full flex justify-center items-center'>
                                                    <Typography style={{ color: '#647F97' }}>{coord.tipc_lon_seg}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-1/4 ml-8 flex'>
                                            <div className='w-1/2 flex justify-center items-center mr-8'>

                                                <Typography style={{ color: '#647F97' }}>{coord.tipc_alt}</Typography>

                                            </div>
                                            <div className='w-1/2 ml-8 flex justify-center items-center'>
                                                <div>
                                                    <IconButton className='' onClick={deleteItem(i)}>
                                                        <TrashIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null}
                        <Divider style={{ borderColor: '#D1E3F5' }} />
                    </div>
                </div>
                <div className='flex mb-52'>
                    <div className='flex flex-col w-1/2 mr-16'>
                        <Typography className='font-semibold text-14  mb-16' style={{ color: '#145C9C' }}>
                            ¿Requiere servidumbre para el aprovechamiento o para la construcción de las obras de captación? <Tooltip
                                title='Indicar si se requiere o no permiso de servidumbre para la
                                construcción de las obras de captación, líneas de conducción etc., para el aprovechamiento del recurso hídrico. Es responsabilidad del usuario realizar los trámites
                                correspondientes de servidumbre cuando se requieran.
                                '
                                placement='top'>
                                <IconButton className='p-0 mx-16 absolute'>
                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                </IconButton>
                            </Tooltip>
                        </Typography>
                        <div className='flex justify-center'>
                            <CustomToggleButtons
                                labelLeft='Si'
                                labelRight='No'
                                open={changeServidumbre('no')}
                                close={changeServidumbre('si')}
                                selectedLeft={formInfoCap.servidumbre === 1 ? true : false}
                                selectedRight={formInfoCap.servidumbre === 0 ? true : false}
                            />
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <div className='w-full mb-16'>
                            <Typography className='font-semibold text-14 mr-16' style={{ color: '#145C9C' }}>
                                Número y fecha de expedición del permiso de exploración
                                (si aplica - opcional)  <Tooltip
                                    title='Indicar si se requiere o no permiso de servidumbre para la
                                construcción de las obras de captación, líneas de conducción etc., para el aprovechamiento del recurso hídrico. Es responsabilidad del usuario realizar los trámites
                                correspondientes de servidumbre cuando se requieran.
                                '
                                    placement='top'>
                                    <IconButton className='p-0 mx-16 absolute'>
                                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </div>
                        <div className='flex mb-16'>
                            <div className='mr-16 w-1/2'>
                                <CustomTextField
                                    label='Numero'
                                    value={formInfoCap.numeroExpedicion}
                                    onChange={changeNumber('numeroExpedicion')}
                                />
                            </div>
                            <div className='ml-16 w-1/2'>

                                <MobileDatePicker
                                    label="Fecha de expedicion"
                                    inputFormat="MM/dd/yyyy"
                                    value={formInfoCap.fechaExpedicion}
                                    onChange={changeDate}
                                    clearable
                                    clearText='Borrar'
                                    maxDate={new Date()}
                                    renderInput={(params) => <CustomTextField  {...params} error={false} />}
                                />
                            </div>
                        </div>
                        <div className='flex mb-16'>
                            <Typography className='font-semibold text-14 mr-32 self-center ' style={{ color: '#145C9C' }}>
                                ¿Anexa informe de exploración?
                            </Typography>
                            <CustomToggleButtons
                                labelLeft='Si'
                                labelRight='No'
                                open={changeInforme('no')}
                                close={changeInforme('si')}
                                selectedLeft={formInfoCap.anexaInfoExploracion === 1 ? true : false}
                                selectedRight={formInfoCap.anexaInfoExploracion === 0 ? true : false}
                            />
                        </div>
                        <div>
                            <CustomUploadFile
                                style={{ height: 100, backgroundColor: 'white' }}
                                height='normal'
                                value={croquis}
                                setValue={setCroquis}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default InfoPuntoCaptacion
