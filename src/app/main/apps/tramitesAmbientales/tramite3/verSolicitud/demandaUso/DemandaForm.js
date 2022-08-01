import React from 'react';
import CustomTextField from '@components/CustomTextField';
import { Divider, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { TrashIcon } from '@components/FuseSvgIcon';
import CustomButton from '@components/CustomButton';

const DemandaForm = (props) => {
    const {
        abastecimientoDomestico,
        riesgo,
        acuicultura,
        abastecimientoAbrevaderos,
        domesticoArray,
        riesgoArray,
        acuiculturaArray,
        abrevaderosArray,
        changeNumberDomestico,
        changeNumberRiesgo,
        changeNumberAcuicultura,
        changeNumberAbrevaderos,
        changeTextRiesgo,
        changeTextAcuicultura,
        changeTextAbastecimientoAbrevaderos,
        addDomestico,
        addRiesgo,
        addAcuicultura,
        addAbrevaderos,
        delItemDomestico,
        delItemRiesgo,
        delItemAcuicultura,
        delItemAbrevaderos,
    } = props;

    return (
        <div className='w-full' style={{ marginRight: 28 }}>
            <div className='mb-52' >
                <div style={{ backgroundColor: '#EEF7FF' }} className='w-full h-60 flex justify-center items-center mb-2'>
                    <Typography className='text-primary font-bold text-16 mr-8'>Abastecimiento doméstico
                        <Tooltip
                            title='Establezca el número de personas permanentes y transitorias que hacen uso del recurso hídrico, así como los días de
                            aprovechamiento al mes (artículo 2.2.3.2.9.6 del Decreto 1076 de 2015). Lo anterior, para establecer el módulo de consumo de agua.
                                '
                            placement='top'>
                            <IconButton className='p-0  mx-16'>
                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </div>
                <div className='overflow-x-scroll'>
                    <div className='flex mb-16' style={{ minWidth: 600 }}>
                        <div style={{ backgroundColor: '#EEF7FF' }} className='w-1/2 h-60 flex justify-center items-center mr-1'>
                            <Typography className='text-primary font-bold text-16 mr-8'>Nro Personas
                                <Tooltip
                                    title='Establezca el número de personas permanentes y transitorias que hacen uso del recurso hídrico para establecer el módulo de consumo de agua.'
                                    placement='top'>
                                    <IconButton className='p-0  mx-16'>
                                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </div>
                        <div style={{ backgroundColor: '#EEF7FF' }} className='w-1/2 h-60 flex justify-center items-center ml-1'>
                            <Typography className='text-primary font-bold text-16 mr-8'>Aprovechamiento (día/mes)
                                <Tooltip
                                    title='Establezca  los días de aprovechamiento del recurso hídrico al mes para establecer el módulo de consumo de agua.'
                                    placement='top'>
                                    <IconButton className='p-0  mx-16'>
                                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </div>
                    </div>
                    <div className='flex mb-16' style={{ minWidth: 600 }}>
                        <div className='flex w-1/2 mr-6'>
                            <div className='w-1/2 mr-4'>
                                <CustomTextField
                                    label='Permanentes'
                                    style={{ minWidth: 0 }}
                                    value={abastecimientoDomestico.tdua_ad_nro_permanentes}
                                    onChange={changeNumberDomestico('tdua_ad_nro_permanentes')}
                                />
                            </div>
                            <div className='w-1/2 ml-4'>
                                <CustomTextField
                                    label='Transitorias'
                                    style={{ minWidth: 0 }}
                                    value={abastecimientoDomestico.tdua_ad_nro_transitorias}
                                    onChange={changeNumberDomestico('tdua_ad_nro_transitorias')}
                                />
                            </div>
                        </div>
                        <div className='flex w-1/2 ml-6'>
                            <div className='w-full mr-4'>
                                <CustomTextField
                                    label='Aprovechamiento (día/mes)'
                                    style={{ minWidth: 0 }}
                                    value={abastecimientoDomestico.tdua_ad_nroper_aprov_dia_mes}
                                    onChange={changeNumberDomestico('tdua_ad_nroper_aprov_dia_mes')}
                                />
                            </div>
                            <div>
                                <CustomButton
                                    label={<AddCircleOutlineRoundedIcon className='text-32' />}
                                    className='secondary'
                                    height='large'
                                    style={{ marginLeft: 4 }}
                                    onClick={addDomestico}
                                    disabled={abastecimientoDomestico.tdua_ad_nro_permanentes === '' || abastecimientoDomestico.tdua_ad_nro_transitorias === '' || abastecimientoDomestico.tdua_ad_nroper_aprov_dia_mes === ''}
                                />
                            </div>
                        </div>
                    </div>

                    {domesticoArray.map((domestico, i) => {
                        return (
                            <div style={{ minWidth: 600 }}>
                                <Divider style={{ borderColor: '#D1E3F5' }} />
                                <div className='flex '>
                                    <div className='flex w-1/2 mr-6'>
                                        <div className='mr-4 w-1/2 flex justify-center items-center'>
                                            <Typography style={{ color: '#647F97' }}>{domestico.tdua_ad_nro_permanentes}</Typography>
                                        </div>
                                        <div className='ml-4 w-1/2 flex justify-center items-center'>
                                            <Typography style={{ color: '#647F97' }}>{domestico.tdua_ad_nro_transitorias}</Typography>
                                        </div>
                                    </div>
                                    <div className='flex w-1/2 ml-6'>
                                        <div className='mr-4 w-full flex justify-center items-center'>
                                            <Typography style={{ color: '#647F97' }}>{domestico.tdua_ad_nroper_aprov_dia_mes}</Typography>
                                        </div>
                                        <div className='flex justify-center items-center w-76'>
                                            <IconButton onClick={delItemDomestico(i)}>
                                                <TrashIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                    <Divider style={{ borderColor: '#D1E3F5' }} style={{ minWidth: 600 }} />
                </div>
            </div>
            <div className='mb-52'>
                <div style={{ backgroundColor: '#EEF7FF' }} className='w-full h-60 flex justify-center items-center mb-16'>
                    <Typography className='text-primary font-bold text-16 mr-8'>Riego y Silvicultura
                        <Tooltip
                            title='Indique los tipos de cultivos y la extensión del área del predio de riego. Lo anterior, para establecer el volumen de agua a concesionar.'
                            placement='top'>
                            <IconButton className='p-0  mx-16'>
                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                            </IconButton>
                        </Tooltip></Typography>
                </div>
                <div className='overflow-x-scroll'>
                    <div className='flex mb-16' style={{ minWidth: 600 }}>
                        <div className='w-1/2 mr-4' >
                            <CustomTextField
                                label='Tipo de cultivo'
                                style={{ minWidth: 0 }}
                                value={riesgo.tdua_rs_tipo_cultivo}
                                onChange={changeTextRiesgo('tdua_rs_tipo_cultivo')}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip
                                                title='Indique los tipos de cultivos del predio de riego para establecer el volumen de agua a concesionar.'
                                                placement='top'>
                                                <IconButton className='p-0 '>
                                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                            />
                        </div>
                        <div className='w-1/2 mx-4'>
                            <CustomTextField
                                label='Extensión (ha)'
                                style={{ minWidth: 0 }}
                                value={riesgo.tdua_rs_extension}
                                onChange={changeNumberRiesgo('tdua_rs_extension')}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip
                                                title='Indique la extensión del área del predio de riego para establecer el volumen de agua a concesionar.'
                                                placement='top'>
                                                <IconButton className='p-0  '>
                                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                            />
                        </div>
                        <div>
                            <CustomButton
                                label={<AddCircleOutlineRoundedIcon className='text-32' />}
                                className='secondary'
                                height='large'
                                style={{ marginLeft: 4 }}
                                onClick={addRiesgo}
                                disabled={riesgo.tdua_rs_tipo_cultivo === '' || riesgo.tdua_rs_extension === ''}
                            />
                        </div>
                    </div>
                    <div>
                        {riesgoArray.map((riego, i) => {
                            return (
                                <div style={{ minWidth: 600 }}>
                                    <Divider style={{ borderColor: '#D1E3F5' }} />
                                    <div className='flex '>
                                        <div className='mr-4 w-1/2 flex justify-center items-center'>
                                            <Typography style={{ color: '#647F97' }}>{riego.tdua_rs_tipo_cultivo}</Typography>
                                        </div>
                                        <div className='mx-4 w-1/2 flex justify-center items-center'>
                                            <Typography style={{ color: '#647F97' }}>{riego.tdua_rs_extension}</Typography>
                                        </div>
                                        <div className='flex justify-center items-center w-76'>
                                            <IconButton onClick={delItemRiesgo((i))}>
                                                <TrashIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <Divider style={{ borderColor: '#D1E3F5' }} style={{ minWidth: 600 }} />
                    </div>
                </div>
            </div>
            <div className='mb-52'>
                <div style={{ backgroundColor: '#EEF7FF' }} className='w-full h-60 flex justify-center items-center mb-16'>
                    <Typography className='text-primary font-bold text-16 mr-8'>Acuicultura y pesca <Tooltip
                        title='establezca el tipo de especie y la producción en toneladas al año, dada la utilización del recurso hídrico para la reproducción,
                                            supervivencia, crecimiento, extracción y aprovechamiento en cualquiera de sus formas. Lo anterior, para establecer el volumen de agua a concesionar.'
                        placement='top'>
                        <IconButton className='p-0 mx-16 '>
                            <HelpOutlineIcon style={{ color: '#145C9C' }} />
                        </IconButton>
                    </Tooltip></Typography>
                </div>
                <div className='overflow-x-scroll'>
                    <div className='flex mb-16' style={{ minWidth: 600 }}>
                        <div className='w-1/2 mr-4'>
                            <CustomTextField
                                label='Especie'
                                style={{ minWidth: 0 }}
                                value={acuicultura.tdua_ap_especie}
                                onChange={changeTextAcuicultura('tdua_ap_especie')}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip
                                                title='establezca el tipo de especie, dada la utilización del recurso hídrico para la reproducción,
                                            supervivencia, crecimiento, extracción y aprovechamiento en cualquiera de sus formas. Lo anterior, para establecer el volumen de agua a concesionar.'
                                                placement='top'>
                                                <IconButton className='p-0'>
                                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                            />
                        </div>
                        <div className='w-1/2 mx-4'>
                            <CustomTextField
                                label='Producción (Ton/año) '
                                value={acuicultura.tdua_ap_produccion}
                                onChange={changeNumberAcuicultura('tdua_ap_produccion')}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip
                                                title='establezca la producción en toneladas al año, dada la utilización del recurso hídrico para la reproducción,
                                            supervivencia, crecimiento, extracción y aprovechamiento en cualquiera de sus formas. Lo anterior, para establecer el volumen de agua a concesionar.'
                                                placement='top'>
                                                <IconButton className='p-0 mx-16 '>
                                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                                style={{ minWidth: 0 }}
                            />
                        </div>
                        <div>
                            <CustomButton
                                label={<AddCircleOutlineRoundedIcon className='text-32' />}
                                className='secondary'
                                height='large'
                                style={{ marginLeft: 4 }}
                                onClick={addAcuicultura}
                                disabled={acuicultura.tdua_ap_especie === '' || acuicultura.tdua_ap_produccion === ''}
                            />
                        </div>
                    </div>
                    <div>
                        {acuiculturaArray.map((acuicultura, i) => {
                            return (

                                <div style={{ minWidth: 600 }}>
                                    <Divider style={{ borderColor: '#D1E3F5' }} />
                                    <div className='flex'>
                                        <div className='mr-4 w-1/2 flex justify-center items-center'>
                                            <Typography style={{ color: '#647F97' }}>{acuicultura.tdua_ap_especie}</Typography>
                                        </div>
                                        <div className='mx-4 w-1/2 flex justify-center items-center'>
                                            <Typography style={{ color: '#647F97' }}>{acuicultura.tdua_ap_produccion}</Typography>
                                        </div>
                                        <div className='flex justify-center items-center w-76'>
                                            <IconButton onClick={delItemAcuicultura(i)}>
                                                <TrashIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <Divider style={{ borderColor: '#D1E3F5' }} style={{ minWidth: 600 }} />
                    </div>
                </div>
            </div>
            <div className='mb-52'>
                <div style={{ backgroundColor: '#EEF7FF' }} className='w-full h-60 flex justify-center items-center mb-16'>
                    <Typography className='text-primary font-bold text-16 mr-8'>Abastecimiento de abrevaderos
                        <Tooltip
                            title='Señale tipo y número de animales o especies que consumen agua, dentro de procesos de crianza, crecimiento y reproducción
                        de su ciclo. Lo anterior, para establecer el volumen de agua a concesionar.'
                            placement='top'>
                            <IconButton className='p-0 mx-16 '>
                                <HelpOutlineIcon style={{ color: '#145C9C' }} />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </div>
                <div className='overflow-x-scroll'>
                    <div className='flex mb-16' style={{ minWidth: 600 }}>
                        <div className='w-1/2 mr-4'>
                            <CustomTextField
                                label='Tipo de animales'
                                style={{ minWidth: 0 }}
                                value={abastecimientoAbrevaderos.tdua_aa_tipo_animal}
                                onChange={changeTextAbastecimientoAbrevaderos('tdua_aa_tipo_animal')}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip
                                                title='Señale tipo de animales o especies que consumen agua, dentro de procesos de crianza, crecimiento y reproducción
                                            de su ciclo. Lo anterior, para establecer el volumen de agua a concesionar.'
                                                placement='top'>
                                                <IconButton className='p-0'>
                                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                            />
                        </div>
                        <div className='w-1/2 mx-4' >
                            <CustomTextField
                                label='Número'
                                style={{ minWidth: 0 }}
                                value={abastecimientoAbrevaderos.tdua_aa_numero}
                                onChange={changeNumberAbrevaderos('tdua_aa_numero')}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip
                                                title='Señale el número de animales o especies que consumen agua, dentro de procesos de crianza, crecimiento y reproducción
                                            de su ciclo. Lo anterior, para establecer el volumen de agua a concesionar.'
                                                placement='top'>
                                                <IconButton className='p-0 mx-16 '>
                                                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                            />
                        </div>
                        <div>
                            <CustomButton
                                label={<AddCircleOutlineRoundedIcon className='text-32' />}
                                className='secondary'
                                height='large'
                                style={{ marginLeft: 4 }}
                                onClick={addAbrevaderos}
                                disabled={abastecimientoAbrevaderos.tdua_aa_tipo_animal === ''|| abastecimientoAbrevaderos.tdua_aa_numero === ''}
                            />
                        </div>
                    </div>
                    <div>
                        {abrevaderosArray.map((abrevadero, i) => {
                            return (
                                <div style={{ minWidth: 600 }}>
                                    <Divider style={{ borderColor: '#D1E3F5' }} />
                                    <div className='flex'>
                                        <div className='mr-4 w-1/2 flex justify-center items-center'>
                                            <Typography style={{ color: '#647F97' }}>{abrevadero.tdua_aa_tipo_animal}</Typography>
                                        </div>
                                        <div className='mx-4 w-1/2 flex justify-center items-center'>
                                            <Typography style={{ color: '#647F97' }}>{abrevadero.tdua_aa_numero}</Typography>
                                        </div>
                                        <div className='flex justify-center items-center w-76'>
                                            <IconButton onClick={delItemAbrevaderos(i)}>
                                                <TrashIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <Divider style={{ borderColor: '#D1E3F5' }} style={{ minWidth: 600 }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DemandaForm
