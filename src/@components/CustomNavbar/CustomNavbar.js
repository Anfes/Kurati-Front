import React from 'react';
import {
    Grid,
    AppBar,
    Toolbar,
    Avatar
} from '@mui/material';
import CustomButton from '@components/CustomButton';

const CustomNavbar = (props) => {
    const { loginButton, singInButton, notifications, search, user, funcionario } = props;

    return (
        <div className='w-full'>
            <AppBar position="static" style={{ boxShadow: 'none' }}>
                <Grid container justifyContent='center' className='bg-white'>
                    <Grid item xs={11} lg={10}>
                        <Toolbar className='flex flex-col md:flex-row justify-center md:justify-between py-10 px-0'>
                            <div className='flex items-center'>
                                <a href={funcionario ? '/iniciar-sesion-funcionario' : '/'}>
                                    <img src='/assets/images/logos/logo_vigpro.png' style={{width:'10.8rem'}} alt='logo vigpro' />
                                </a>
                                <div className='mx-10 h-16 w-2 bg-primary' />
                                <p className='text-primary font-600 text-18'>
                                    Trámites
                                </p>
                            </div>
                            <div className='flex items-center mt-12 md:mt-0'>
                                <div className='mx-10'>
                                    {search}
                                </div>
                                {!user ?
                                    <div className='flex items-center'>
                                        {loginButton ?
                                            <div className='mx-10'>
                                                <CustomButton
                                                    label='Iniciar sesión'
                                                    className='textButton'
                                                    height='medium'
                                                    href={funcionario ? '/iniciar-sesion-funcionario' : '/iniciar-sesion'}
                                                />
                                            </div>
                                            :
                                            ''
                                        }
                                        {singInButton ?
                                            <div className='mx-10'>
                                                <CustomButton
                                                    label='Regístrarme'
                                                    className='primary'
                                                    height='medium'
                                                    href={funcionario ? '/registro-funcionario' : '/registro-ciudadano'}
                                                />
                                            </div>
                                            :
                                            ''
                                        }
                                    </div>
                                    :
                                    <div>
                                        <div className='mx-10'>
                                            {notifications}
                                        </div>
                                        <div className='flex items-center'>
                                            <p>nombre</p>
                                            <p>rol</p>
                                            <Avatar>
                                                sss
                                            </Avatar>
                                        </div>
                                    </div>
                                }

                            </div>
                        </Toolbar>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
};

export default CustomNavbar;