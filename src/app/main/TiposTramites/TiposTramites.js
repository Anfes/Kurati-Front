import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllStates, getAllTypeProcedure } from './store/TiposTramitesSlice';
import reducer from './store'
import withReducer from 'app/store/withReducer';

import { Card, Grid, CardActionArea, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import CustomNavbar from '@components/CustomNavbar';
import CustomButton from '@components/CustomButton';
import CustomSearchSelect from '@components/CustomSearchSelect';

const useStyles = makeStyles(() => ({
    containInfo: {
        border: '1px solid #E6F0FA',
        padding: 13,
        minHeight: 160,
        minWidth: 312,
        maxWidth: 350,
        '&:hover': {
            boxShadow: ' 0px 2px 16px 4px rgba(2, 62, 115, 0.1)'
        }
    },
    porcedure: {
        width: '24%',
        height: 140,
        // minWidth: 312,
        borderRadius: 8,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
}));

function TiposTramitesPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [selected, setSelected] = useState(false);
    const [departamento, setDepartamento] = useState('');
    const dataState = useSelector(({ data }) => data.tiposTramites.dataStates);
    const dataTypeProcedure = useSelector(({ data }) => data.tiposTramites.dataTypeProcedure);

    const matches = useMediaQuery('(min-width:1280px)');

    useEffect(() => {
        async function fetch() {
            await dispatch(getAllStates())
            await dispatch(getAllTypeProcedure())
        }
        fetch()
    }, []);

    function changeDepartamento(e) {
        if (e && e.value) {
            setDepartamento(e);
        } else {
            setDepartamento('');
        }
    }

    const departamentos = dataState && dataState.length > 0 ? dataState.map(e => ({
        label: e.st_name,
        value: e.st_id,
    })) : [];

    return (
        <div className='bg-white'>
            <CustomNavbar
                loginButton={true}
                singInButton={true}
            />
            <Grid container justifyContent='center' className='bg-primaryLight min-h-160'>
                <Grid item xs={11} lg={10} className='flex flex-col justify-center pt-24'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <p className='font-bold text-primary text-18'>
                                Tipos de trámites
                            </p>
                            <p className='text-primaryBlack text-14'>
                                Selecciona el trámite que necesitas
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-center lg:justify-between -mb-80 pt-32'>
                        {dataTypeProcedure && dataTypeProcedure.length > 0 ? dataTypeProcedure.map((e) => {
                            return (
                                <Card
                                    className={clsx(classes.porcedure, 'm-10 lg:m-4 min-w-288 md:min-w-360 lg:min-w-224')}
                                    style={{
                                        backgroundImage: `url(/assets/images/home/${e.tc_imagen}.png)`,
                                        cursor: e.tc_estado == 1 ? 'pointer' : 'default',
                                        boxShadow: e.tc_estado === 1 ? '0px 2px 16px 4px rgba(2, 62, 115, 0.3)' : 'none'
                                    }}
                                    key={e.id}>
                                    {e.tc_estado == 1 ?
                                        <a href='#buscar' style={{ textDecoration: 'none', color:'white', fontWeight: 700 }}>
                                            <CardActionArea
                                                onClick={() => setSelected(!selected)}
                                                style={{
                                                    cursor: e.tc_estado == 1 ? 'pointer' : 'default'
                                                }}

                                            >
                                                <div className='w-full flex items-end p-10' style={{ height: 140 }}>
                                                    {e.tc_nombre}
                                                </div>
                                            </CardActionArea>
                                        </a>
                                        :
                                        <div className='w-full flex items-end p-10' style={{ height: 140 }}>
                                            {e.tc_nombre}
                                        </div>
                                    }
                                </Card>
                            )
                        }) : []}
                    </div>
                </Grid>
            </Grid>
            <Grid container justifyContent='center'
                className='bg-white lg:h-full'
                style={{ marginTop: matches ? 0 : '20%', marginBottom: matches ? 0 : '25%' }}
            >
                {selected ?
                    <Grid item xs={11} lg={10} className='flex  items-center'>
                        <div className='flex flex-col w-full'>
                            <p className='font-bold text-16 my-12'>
                                Indica el departamento donde solicitarás el trámite
                            </p>
                            <div className='max-w-320' id="buscar">
                                <CustomSearchSelect
                                    placeholder='Escribe el nombre del departamento'
                                    options={departamentos}
                                    value={departamento}
                                    id='departamentos'
                                    isMulti={false}
                                    noOptionsMessage={() => '- Sin resultados -'}
                                    onChange={changeDepartamento}
                                    isClearable={true}
                                />
                            </div>
                            <div className='w-full h-2 bg-primaryBlack my-16' />
                            {departamento && departamento.value === 23 ?
                                <div className='flex flex-col'>
                                    <p>Resultados de la búsqueda (1)</p>
                                    <div className='my-12'>
                                        <div className={clsx(classes.containInfo, 'flex items-start rounded-6')}>
                                            <img
                                                src='/assets/images/logos/img-cortolima.svg'
                                                alt='cortolima'
                                                style={{ minWidth: 56, minHeight: 56 }}
                                            />
                                            <div className='flex flex-col ml-10'>
                                                <p className='text-16 font-bold mb-12'>
                                                    Cortolima
                                                </p>
                                                <p className='text-primaryBlack text-12 font-bold'>
                                                    Corporación autónoma regional del Tolima
                                                </p>
                                                <p className='text-14 my-12 font-semibold'>
                                                    Esta sede cubre la zona urbana de Ibagué y sus alrededores
                                                </p>
                                                <div className='w-full flex justify-end'>
                                                    <CustomButton
                                                        label='Ir a sede'
                                                        className='primary'
                                                        endIcon={
                                                            <ArrowForwardIosRoundedIcon
                                                                style={{ color: '#4FDFC8', fontSize: 14 }}
                                                                fontSize='small'
                                                            />
                                                        }
                                                        onClick={() => {
                                                            history.push({
                                                                pathname: "/cortolima-tramites",
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='flex flex-col'>
                                    <p>Resultados de la búsqueda (0)</p>
                                </div>
                            }
                        </div>
                    </Grid>
                    :
                    <Grid item xs={11} lg={10} className='flex flex-col justify-center items-center'>
                        <div className='flex justify-center'>
                            <img src='/assets/images/home/empty-state.svg' alt='empty' />
                        </div>
                        <p className='text-16 text-primaryBlack font-600'>
                            Aún no has seleccionado ningún trámite
                        </p>
                        <p className='text-12 text-primaryBlack font-400'>
                            Los puedes encontrar en la parte superior
                        </p>
                    </Grid>
                }
            </Grid>
        </div>
    );
}

export default withReducer('data', reducer)(TiposTramitesPage);
