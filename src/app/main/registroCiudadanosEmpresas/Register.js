import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Grid, useMediaQuery } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';

import CustomNavbar from '@components/CustomNavbar';
import CustomButton from '@components/CustomButton';
import CustomScreenLoading from '@components/CustomScreenLoading';
import CustomDialog from '@components/CustomDialog';
import history from '@history';
import UseDataPolicy from '@components/useDataPolicy';
import ValidatePhone from './ValidatePhone';
import ContactInfo from './ContactInfo';
import PersonalInfo from './PersonalInfo';
import { addUserOrCompany, confirmCodeUSer } from './store/RegstroCiudadanoSlice';
import TermsConditions from '@components/termsConditions';

function RegisterUser() {
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:1280px)'); /* si pasa 1280px es true */

  const [dialogConfirm, setDialogConfirm] = useState(false);
  const [dialogTerms, setDialogTerms] = useState(false);
  const [dialogPolit, setDialogPolit] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [passwordDiferent, setPasswordDiferent] = useState(false);
  const [showSectionPhone, setShowSectionPhone] = useState(false);
  const [disabledFields, setDisabledFields] = useState(false);
  const [emailCorrect, setEmailCorrect] = useState(undefined);
  const [codeEmpty, setCodeEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [form, setForm] = useState({
    personType: '',
    documentType: '',
    documentNumber: '',
    name: '',
    lastName: '',
    gender: '',
    phone: '',
    email: '',
    termsConditions: false,
    password: '',
    showPassword: false,
    confirmPasword: '',
    showConfirmPassword: false,
    nameCompany: '',
    code: '',
  });

  const [validatePassword, setValidatePassword] = useState({
    passwordLength: false,
    passwordCorrect: false,
    messagePasswordError: '',
  });

  const disabled =
    form.personType === '' ||
    form.documentType === '' ||
    form.documentNumber === '' ||
    form.name === '' ||
    form.lastName === '' ||
    form.gender === '' ||
    form.phone === '' ||
    form.email === '' ||
    form.termsConditions === false ||
    emailCorrect === false ||
    (showSectionPhone && codeEmpty) ||
    form.password === '' ||
    form.confirmPasword === '' ||
    errorPass ||
    (form.personType === 2 && form.nameCompany === '');

  const sendDataRegister = async () => {
    if (showSectionPhone) {
      setLoading(true);
      const bodyConfirm = {
        reg_celular: `57${form.phone}`,
        reg_email: form.email,
        reg_code: form.code,
      };
      const result = await dispatch(confirmCodeUSer(bodyConfirm));
      if (result.status == 200) {
        setDialogConfirm(true);
      } else {
        dispatch(showMessage({ message: result.data.message, variant: result.data.status }));
      }
      setLoading(false);
    } else if (form.phone.length < 10 || form.phone.length > 10) {
      setErrorPhone(true);
      dispatch(
        showMessage({
          message: 'Número de celular inválido. Debe tener 10 dígitos',
          variant: 'error',
        })
      );
    } else if (form.password !== form.confirmPasword) {
      setPasswordDiferent(true);
      dispatch(
        showMessage({
          message: 'Las contraseñas no coinciden, por favor verifique',
          variant: 'error',
        })
      );
    } else {
      const body = {
        reg_tipo_persona: form.personType,
        reg_empresa: form.nameCompany,
        reg_id_tipo_documento: form.documentType,
        reg_documento: form.documentNumber,
        reg_nombres: form.name,
        reg_apellidos: form.lastName,
        reg_genero: form.gender,
        reg_celular: `57${form.phone}`,
        reg_email: form.email,
        reg_password: form.password,
      };
      const result = await dispatch(addUserOrCompany(body));
      dispatch(showMessage({ message: result.message, variant: result.status }));
      if (result && result.status == 'success') {
        setErrorPhone(false);
        dispatch(showMessage({ message: result.message, variant: 'success' }));
        setShowSectionPhone(true);
        setDisabledFields(true);
        setPasswordDiferent(false);
      }
    }
  };

  return (
    <div className="h-screen">
      {loading ? <CustomScreenLoading openLoading={loading} /> : ''}
      <CustomNavbar loginButton />
      <CustomDialog
        img="/assets/images/dialogs/unregistered.png"
        open={dialogConfirm}
        background
        contentText={
          <div className=" flex justify-center items-center flex-col text-center">
            <p className="font-bold text-14">
              ¡Bien hecho, tu celular ha sido verificado! <br />
              Ahora, te enviamos un email para confirmar tu correo.
            </p>
            <p className="my-16">¡Falta un sólo paso! Tienes 30 minutos para confirmar</p>
            <CustomButton
              label="Ir a Inicio de Sesión"
              className="primary"
              height="medium"
              onClick={() => {
                history.push('/iniciar-sesion');
                setDialogConfirm(false);
              }}
            />
          </div>
        }
      />
      <Grid container justifyContent="center" className="flex flex-col lg:flex-row">
        <div
          className="min-h-136 flex items-center justify-center bg-primaryLight"
          style={{ width: showSectionPhone && matches ? '65%' : '100%' }}
        >
          <Grid item xs={11} lg={9}>
            <p className="font-bold text-primary text-18 pl-6">Creación de cuenta</p>
            <p className="text-primaryBlack text-14 pl-6">
              Completa los datos requeridos para poder continuar con el proceso de registro
            </p>
          </Grid>
        </div>
        {showSectionPhone ? (
          <div
            className="min-h-136  bg-white w-full lg:w-1/3 pb-60 hidden lg:block"
            style={{
              borderLeft: showSectionPhone ? '1px solid #D1E3F5' : 'none',
            }}
          />
        ) : (
          ''
        )}
      </Grid>
      <Grid
        container
        justifyContent="center"
        className="flex flex-col lg:flex-row"
        style={{ paddingBottom: '7%' }}
      >
        <div
          className="min-h-136 flex items-center justify-center bg-white"
          style={{ width: showSectionPhone && matches ? '65%' : '100%' }}
        >
          <Grid item xs={11} lg={9} className="flex flex-col">
            <PersonalInfo
              form={form}
              setForm={setForm}
              setValidatePassword={setValidatePassword}
              validatePassword={validatePassword}
              setErrorPass={setErrorPass}
              errorPass={errorPass}
              disabledFields={disabledFields}
              passwordDiferent={passwordDiferent}
            />
            <ContactInfo
              form={form}
              setForm={setForm}
              emailCorrect={emailCorrect}
              setEmailCorrect={setEmailCorrect}
              setDialogTerms={setDialogTerms}
              setDialogPolit={setDialogPolit}
              disabledFields={disabledFields}
              errorPhone={errorPhone}
            />
          </Grid>
        </div>
        {showSectionPhone ? (
          <div
            className="min-h-136 bg-white w-full lg:w-1/3 pb-60 flex items-center justify-center lg:justify-start"
            style={{
              borderLeft: showSectionPhone ? '1px solid #D1E3F5' : 'none',
            }}
          >
            <Grid item xs={11} lg={9}>
              <ValidatePhone setCodeEmpty={setCodeEmpty} setForm={setForm} form={form} />
            </Grid>
          </div>
        ) : (
          ''
        )}
      </Grid>
      <Grid
        container
        justifyContent="center"
        className="fixed bottom-0 z-999 bg-white h-80"
        style={{ boxShadow: '0px -2px 8px 4px rgba(229, 229, 229, 0.35)' }}
      >
        <Grid item xs={11} lg={9} className="flex items-center justify-end">
          {showSectionPhone ? (
            <CustomButton
              label="Modificar datos"
              className="outlinePrimary"
              height="large"
              onClick={() => {
                setShowSectionPhone(false);
                setDisabledFields(false);
              }}
            />
          ) : (
            ''
          )}
          <div className="ml-12">
            <CustomButton
              label="Continuar"
              className="primary"
              disabled={disabled}
              height="large"
              onClick={sendDataRegister}
            />
          </div>
        </Grid>
      </Grid>
      <CustomDialog
        img="/assets/images/dialogs/unregistered.png"
        title="Terminos y condiciones"
        open={dialogTerms}
        showClose
        close={() => {
          setDialogTerms(false);
        }}
        contentText={<TermsConditions/>}
      />
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
    </div>
  );
}

export default RegisterUser;
