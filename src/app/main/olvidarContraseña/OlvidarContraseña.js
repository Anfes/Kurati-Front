import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createStyles, makeStyles } from '@mui/styles';
import { Card, CardContent, Hidden } from '@mui/material';

import { showMessage } from 'app/store/fuse/messageSlice';
import CustomDialog from '@components/CustomDialog';
import { sendForgotPass, confirmCodeUSer, changePass } from './store/OlvidarContraseñaSlice';

import ValidatePhone from './ValidatePhone';
import EmailConfirm from './EmailConfirm';
import RestablecerContraseña from './RestablecerContraseña';
import UseDataPolicy from '@components/useDataPolicy';

const useStyles = makeStyles((theme) =>
  createStyles({
    leftSection: {
      backgroundImage: 'url(/assets/images/backgrounds/login.png)',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

function OlvidarContraseña() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showConfirmCode, setShowConfirmCode] = useState(false);
  const [showFieldEmail, setShowFieldEmail] = useState(true);
  const [showRestorePassword, setShowRestorePassword] = useState(false);
  const [emailCorrect, setEmailCorrect] = useState(undefined);
  const [codeEmpty, setCodeEmpty] = useState(true);
  const [errorPass, setErrorPass] = useState(false);
  const [token, setToken] = useState('');
  const [dialogPolit, setDialogPolit] = useState(false);

  const [form, setForm] = useState({
    email: '',
    code: '',
    password: '',
    showPassword: false,
    confirmPasword: '',
    showConfirmPassword: false,
  });

  const disabled =
    (showConfirmCode && codeEmpty) ||
    (showFieldEmail && form.email == '') ||
    (showFieldEmail && emailCorrect == false) ||
    (showRestorePassword && form.password === '') ||
    (showRestorePassword && form.confirmPasword === '') ||
    (showRestorePassword && errorPass);

  const sendEmailForgotPass = async () => {
    if (showConfirmCode) {
      const bodyConfirm = {
        code: form.code,
        token,
      };
      const result = await dispatch(confirmCodeUSer(bodyConfirm));
      if (result.status == 200) {
        dispatch(showMessage({ message: 'El código fue validado', variant: 'success' }));
        setShowRestorePassword(true);
        setShowConfirmCode(false);
      } else {
        dispatch(showMessage({ message: `${result.data.message}`, variant: 'error' }));
      }
    } else {
      const result = await dispatch(sendForgotPass(form.email));
      if (result.status == 200) {
        setShowConfirmCode(true);
        setShowFieldEmail(false);
        dispatch(showMessage({ message: 'Se ha enviado el código', variant: result.data.status }));
        setToken(result.data.token);
      } else {
        dispatch(showMessage({ message: result.data.message, variant: result.data.status }));
      }
    }
  };

  const updatePassword = async () => {
    if (form.password !== form.confirmPasword) {
      setPasswordDiferent(true);
      dispatch(
        showMessage({
          message: 'Las contraseñas no coinciden, por favor verifique',
          variant: 'error',
        })
      );
    } else {
      const bodyConfirm = {
        token,
        password_reset: form.password,
      };
      const result = await dispatch(changePass(bodyConfirm));
      if (result.status == 200) {
        dispatch(showMessage({ message: result.data.message, variant: result.data.status }));
        history.push('/iniciar-sesion');
      }
      dispatch(showMessage({ message: result.data.message, variant: result.data.status }));
    }
  };

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
        <CardContent
          className={clsx(classes.leftSection, 'w-full p-52 lg:p-40 flex flex-col flex-1')}
        >
          <div className="flex items-center justify-center md:justify-start">
            <img src="/assets/images/logos/logo_vigpro white.png" className="w-128" />
            <div className="mx-10 h-16 w-2 bg-white" />
            <p className="text-white font-600 text-18">Trámites</p>
          </div>
          {/* ******************************************************************** dispositivos moviles  ****************************************************************** */}
          <Hidden mdDown>
            <>
              <div className="flex justify-between h-full items-end">
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
            <div className="py-60 flex justify-center flex-col items-center h-full">
              <div className="flex flex-col items-center justify-center mb-20 text-center">
                {showRestorePassword ? (
                  <p className="text-primaryBlack text-16 text-center">Ingresa Nueva Contraseña</p>
                ) : (
                  <p className="text-24 text-white font-bold my-16">Restablecer Contraseña</p>
                )}
              </div>
              <div className="max-w-320">
                {showFieldEmail ? (
                  <EmailConfirm
                    setForm={setForm}
                    form={form}
                    disabled={disabled}
                    sendEmailForgotPass={sendEmailForgotPass}
                    setShowConfirmCode={setShowConfirmCode}
                    setShowFieldEmail={setShowFieldEmail}
                    emailCorrect={emailCorrect}
                    setEmailCorrect={setEmailCorrect}
                  />
                ) : (
                  ''
                )}
                {showConfirmCode ? (
                  <ValidatePhone
                    setCodeEmpty={setCodeEmpty}
                    setForm={setForm}
                    form={form}
                    disabled={disabled}
                    sendEmailForgotPass={sendEmailForgotPass}
                    setShowConfirmCode={setShowConfirmCode}
                    setShowFieldEmail={setShowFieldEmail}
                  />
                ) : (
                  ''
                )}
                {showRestorePassword ? (
                  <RestablecerContraseña
                    form={form}
                    setForm={setForm}
                    disabled={disabled}
                    errorPass={errorPass}
                    setErrorPass={setErrorPass}
                    updatePassword={updatePassword}
                  />
                ) : (
                  ''
                )}
              </div>
              {showFieldEmail ? (
                <div className="flex pb-32 mt-16 justify-center items-center">
                  <div
                    className="font-bold text-16 underline"
                    style={{ color: 'white' }}
                    onClick={() => {
                      history.push('/iniciar-sesion');
                    }}
                  >
                    Regresar al inicio de sesión
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </Hidden>
        </CardContent>
      </Card>
      {/* *************************************************************************************** escritorio ******************************************************************* */}
      <div className="hidden md:flex flex-col flex-1 items-center justify-center p-64 bg-white">
        <div className="flex items-center mb-32">
          <img
            src="/assets/images/logos/logo_vigpro.png"
            style={{ width: '10.8rem' }}
            alt="logo vigpro"
          />
          <div className="mx-10 h-16 w-2 bg-primary" />
          <p className="text-primary font-600 text-18">Trámites</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          {showRestorePassword ? (
            <p className="text-primaryBlack text-16 text-center my-16">Ingresa Nueva Contraseña</p>
          ) : (
            <p className="text-24 text-primary font-bold my-16">Restablecer Contraseña</p>
          )}
        </div>
        <div className="max-w-400">
          {showFieldEmail ? (
            <EmailConfirm
              setForm={setForm}
              form={form}
              disabled={disabled}
              sendEmailForgotPass={sendEmailForgotPass}
              setShowConfirmCode={setShowConfirmCode}
              setShowFieldEmail={setShowFieldEmail}
              emailCorrect={emailCorrect}
              setEmailCorrect={setEmailCorrect}
            />
          ) : (
            ''
          )}
          {showConfirmCode ? (
            <ValidatePhone
              setCodeEmpty={setCodeEmpty}
              setForm={setForm}
              form={form}
              disabled={disabled}
              sendEmailForgotPass={sendEmailForgotPass}
              setShowConfirmCode={setShowConfirmCode}
              setShowFieldEmail={setShowFieldEmail}
            />
          ) : (
            ''
          )}
          {showRestorePassword ? (
            <RestablecerContraseña
              form={form}
              setForm={setForm}
              disabled={disabled}
              errorPass={errorPass}
              setErrorPass={setErrorPass}
              updatePassword={updatePassword}
            />
          ) : (
            ''
          )}
        </div>
        {showFieldEmail ? (
          <div
            className="font-bold text-14 pb-32 mt-20 text-right cursor-pointer underline"
            style={{ color: '#145C9C' }}
            onClick={() => {
              history.push('/iniciar-sesion');
            }}
          >
            Regresar al inicio de sesión
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default OlvidarContraseña;
