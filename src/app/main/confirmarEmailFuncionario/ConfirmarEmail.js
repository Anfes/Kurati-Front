import React, { useEffect } from 'react';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import reducer from './store';

import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

import CustomButton from '@components/CustomButton';
import { getConfirm } from './store/ConfirmarEmailSlice';

const useStyles = makeStyles(() => ({
    headContain: {
        backgroundImage: 'url(/assets/images/backgrounds/bg-cortolima.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 160
    },
    cardInfo: {
        width: 350,
        border: '1px solid #E6F0FA',
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
            boxShadow: ' 0px 2px 16px 4px rgba(2, 62, 115, 0.1)'
        }
    },
    cusToggleButton: {
        '& .MuiButtonBase-root.Mui-selected': {
            backgroundColor: '#023E73',
            color: '#4FDFC8',
            borderRadius: 25,
            textTransform: 'none'
        },
        '& .MuiButtonBase-root': {
            backgroundColor: 'transparent',
            color: '#023E73',
            width: 'fit-content',
            minWidth: 67,
            height: 38,
            textTransform: 'none',
            border: '1px solid #023E73',
            borderLeft: '1px solid #023E73 !important',
            borderRadius: '25px !important',
            margin: 10,
        },
    }
}));


function ConfirmarEmail() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const routerName = location.pathname
    const token = routerName.slice(29)

    const verify = useSelector(({ res }) => res.confirmarEmail.resultVerificar);
    console.log("🚀 ~ file: ConfirmarEmail.js ~ line 64 ~ ConfirmarEmail ~ verify", verify)

    useEffect(() => {
        async function fetch() {
            await dispatch(getConfirm(token))
        }
        fetch()
    }, []);

    return (
        <div className='bg-white h-full'>
            <Grid container justifyContent='center' alignItems='center' className='h-full'>
                <Grid item xs={11} lg={4} className='flex justify-center items-center pt-20'>
                    {verify && verify.status == 'success' ?
                        <div className='flex flex-col justify-center items-center'>
                            <img src='/assets/images/dialogs/unregistered.png' alt='confirm' />

                            <p className='font-bold text-16'>
                                ¡Bien hecho, has completado exitosmaente tu registro!
                            </p>
                            <p className='my-16'>
                                Ahora ya puedes realizar cualquier trámite en Vigpro
                            </p>
                            <CustomButton   
                                label='Ir a Iniciar Sesión'
                                className='primary'
                                height='medium'
                                onClick={() => {
                                    history.push('/iniciar-sesion-funcionario')
                                }}
                            />
                        </div>
                        :
                        <div className='flex flex-col justify-center items-center'>
                            <img src='/assets/images/home/empty-state.svg' alt='confirm' />
                            <p className='font-bold text-16 my-16'>
                                {verify && verify.message}
                            </p>
                            <CustomButton
                                label='Ir a Iniciar Sesión'
                                className='primary'
                                height='medium'
                                onClick={() => {
                                    history.push('/iniciar-sesion-funcionario')
                                }}
                            />
                        </div>
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default withReducer('res', reducer)(ConfirmarEmail);
