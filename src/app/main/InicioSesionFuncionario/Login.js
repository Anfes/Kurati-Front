import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, Hidden } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

import CustomDialog from '@components/CustomDialog';
import UseDataPolicy from '@components/useDataPolicy';
import JWTLoginTab from './tabs/JWTLoginTab';

const useStyles = makeStyles((theme) =>
  createStyles({
    leftSection: {
      backgroundImage:
        'linear-gradient(142.35deg, rgba(64, 54, 179, 0.8) 18.42%, rgba(69, 175, 158, 0.8) 89.93%), url(/assets/images/backgrounds/funcionario.jpg)',
      // backgroundImage: 'url(/assets/images/backgrounds/login.png)',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

function Login() {
  const classes = useStyles();

  const [form, setForm] = useState({
    corporation: '',
  });
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
          <div className="flex items-center h-80">
            {form.corporation === 1 ? (
              <div className="flex items-center">
                <img
                  src="/assets/images/logos/cortolima.png"
                  alt="cortolima"
                  style={{ width: 50, height: 50 }}
                />
                <p className="font-bold text-white text-14 md:text-18 ml-10">Cortolima</p>
              </div>
            ) : (
              ''
            )}
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
                <p className="text-28 text-white font-bold">
                  Iniciar sesión
                  <br />
                </p>
                <p className="text-24 font-bold" style={{ color: 'white' }}>
                  Funcionarios Corporación
                </p>
              </div>
              <div className="max-w-320">
                <JWTLoginTab form={form} setForm={setForm} />
              </div>
              <div className="flex flex-col items-center justify-center pb-32 mt-16">
                <Link
                  className="font-bold text-16"
                  to="/registro-funcionario"
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
          <p className="text-28 text-primary font-bold">
            Iniciar sesión
            <br />
          </p>
          <p className="text-24 font-bold" style={{ color: '#299B89' }}>
            Funcionarios Corporación
          </p>
        </div>
        <div className="max-w-320">
          <JWTLoginTab form={form} setForm={setForm} />
        </div>
        <div className="flex flex-col items-center justify-center pb-32 mt-32">
          <Link
            className="font-bold text-14"
            to="/registro-funcionario"
            style={{ color: '#145C9C' }}
          >
            Crea una cuenta para ingresar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
