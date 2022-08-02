import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Card, CardContent, Hidden } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

import CustomDialog from '@components/CustomDialog';
import UseDataPolicy from '@components/useDataPolicy';
import { useState } from 'react';
import JWTLoginTab from './tabs/JWTLoginTab';

const useStyles = makeStyles((theme) =>
  createStyles({
    leftSection: {
      backgroundImage:
        'linear-gradient(180deg, rgba(0, 39, 74, 0.8) 0%, rgba(83, 73, 197, 0.8) 101.61%), url(/assets/images/backgrounds/ciudadano.jpg)',
      // backgroundImage: 'url(/assets/images/backgrounds/login.png)',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

function Login() {
  const classes = useStyles();
  const [dialogPolit, setDialogPolit] = useState(false);

  return (
    <div className="flex flex-auto  flex-shrink-0">
      <CustomDialog
        showClose
        img="/assets/images/dialogs/unregistered.png"
        title="Política de tratamiento de datos personales"
        open={dialogPolit}
        close={() => {
          setDialogPolit(false);
        }}
        contentText={<UseDataPolicy />}
      />
      <Card className="flex flex-col w-full md:w-3/5 items-center shadow-0" square>
        <CardContent className={clsx(classes.leftSection, 'w-full p-40 flex flex-col flex-1')}>
          <div className="flex items-center justify-center md:justify-start">
            <a href="/">
              <img src="/assets/images/logos/kurati_white_logo.png" className="w-128" />
            </a>
            <div className="mx-10 h-16 w-2 bg-white" />
            <p className="text-white font-600 text-18">Trámites</p>
          </div>
          <Hidden mdDown>
            <>
              <div className="h-4/5 flex flex-col justify-end">
                <p className="text-white font-bold text-52">
                  Realiza <br />
                  cualquier tipo
                  <br />
                  de trámite.
                </p>
                <p className="text-white text-14 mt-14">
                  Trámites ambientales, jurídicos o administrativos, como <br /> persona natural o
                  empresa.
                </p>
              </div>
              <div className="flex justify-between h-1/6 items-end">
                <p className="text-white text-14 mt-14">VIGPRO Trámites, Colombia</p>
                <p
                  className="text-white text-14 mt-14 font-bold cursor-pointer"
                  onClick={() => {
                    setDialogPolit(true);
                  }}
                >
                  Política de privacidad
                </p>
              </div>
            </>
          </Hidden>
          <Hidden mdUp>
            <div className="py-60 flex justify-center flex-col items-center">
              <div className="flex flex-col items-center justify-center mb-20 text-center">
                <p className="text-24 text-white font-bold">Iniciar sesión</p>
                <br />
                <p className="text-24 font-bold" style={{ color: 'white' }}>
                  Ciudadanos o Empresas
                </p>
              </div>
              <div className="max-w-320">
                <JWTLoginTab />
              </div>
              <div className="flex flex-col items-center justify-center pb-32 mt-16">
                <Link
                  className="font-bold text-16"
                  to="/registro-ciudadano"
                  style={{ color: 'white' }}
                >
                  Crea una cuenta para ingresar
                </Link>
              </div>
            </div>
          </Hidden>
        </CardContent>
      </Card>
      <div className="hidden md:flex flex-col flex-1 items-center justify-center p-64 bg-white">
        <div className="flex flex-col items-center justify-center mb-20 text-center">
          <p className="text-24 text-primary font-bold m-0">Iniciar sesión</p>
          <br />
          <p className="text-24 font-bold" style={{ color: '#2E7EC5' }}>
            Ciudadanos o Empresas
          </p>
        </div>
        <div className="max-w-320">
          <JWTLoginTab />
        </div>
        <div className="flex flex-col items-center justify-center pb-32 mt-32">
          <Link className="font-bold text-14" to="/registro-ciudadano" style={{ color: '#145C9C' }}>
            Crea una cuenta para ingresar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
