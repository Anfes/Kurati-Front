import React, { useState } from 'react';

import { InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import CustomTextField from '@components/CustomTextField';
import CustomButton from '@components/CustomButton';

function RestablecerContraseña(props) {
  const { form, setForm, errorPass, setErrorPass, updatePassword, passwordDiferent, disabled } = props;

  const [validatePassword, setValidatePassword] = useState({
    passwordLength: false,
    passwordCorrect: false,
    messagePasswordError: "",
  });

  const handleClickShowPassword = (key) => () => {
    setForm({ ...form, [key]: !form[key] });
  };

  const changeText = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value })
  };

  const handlePasswordChange = (event) => {
    const regExp = /[0-9]/;
    const letters = /([a-zA-Z])/;
    const t = event.currentTarget.value.split(" ");
    let tex = "";
    t.map((r) => {
      if (r !== "") {
        tex += r;
      }
    });
    setForm({ ...form, password: tex });
    if (tex != "" && tex.length >= 8) {
      if (regExp.test(tex)) {
        if (letters.test(tex)) {
          setValidatePassword({
            ...validatePassword,
            messagePasswordError: "",
            passwordCorrect: false,
            passwordLength: false,
          });
          setErrorPass(false)
        } else {
          setValidatePassword({
            ...validatePassword,
            messagePasswordError: "La contraseña debe ser debe ser alfanumerica",
            passwordCorrect: true,
          });
          setErrorPass(true)
        }
      } else {
        setValidatePassword({
          ...validatePassword,
          messagePasswordError: "La contraseña debe ser debe ser alfanumerica",
          passwordCorrect: true,
        });
        setErrorPass(true)
      }
    } else {
      setValidatePassword({
        ...validatePassword,
        messagePasswordError: "La contraseña debe ser mayor a 8 caracteres",
        passwordLength: true,
      });
      setErrorPass(true)
    }
  };



  return (
    <div className="max-w-320">
      <div className='w-full'>
        <CustomTextField
          onChange={handlePasswordChange}
          style={{ backgroundColor: 'white' }}
          helperText={form.password ? validatePassword.messagePasswordError : ""}
          value={form.password}
          placeholder='Contraseña'
          type={form.showPassword ? 'text' : 'password'}
          minLength={8}
          error={passwordDiferent || form.password !== '' ? errorPass : null}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword('showPassword')}
                  size="large"
                >
                  {form.showPassword ?
                    <VisibilityOutlinedIcon
                      style={{ color: form.password !== '' && errorPass ? '#FF4D4D' : '#BDD7EF' }}
                    />
                    :
                    <VisibilityOffOutlinedIcon
                      style={{ color: form.password !== '' && errorPass ? '#FF4D4D' : '#BDD7EF' }} />
                  }
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className='w-full mt-12'>
          <CustomTextField
            onChange={changeText('confirmPasword')}
            style={{ backgroundColor: 'white' }}
            value={form.confirmPasword}
            type={form.showConfirmPassword ? 'text' : 'password'}
            minLength={8}
            helperText={form.confirmPasword && form.confirmPasword !== form.password ? 'Las contraseñas no coinciden' : ''}
            error={form.confirmPasword && form.confirmPasword !== form.password ? true : form.confirmPasword ? errorPass : null}
            placeholder='Confirmar Contraseña'
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword('showConfirmPassword')}
                    size="large"
                  >
                    {form.showConfirmPassword ?
                      <VisibilityOutlinedIcon
                        style={{ color: form.confirmPasword !== '' && errorPass ? '#FF4D4D' : '#BDD7EF' }}
                      />
                      :
                      <VisibilityOffOutlinedIcon
                        style={{ color: form.confirmPasword !== '' && errorPass ? '#FF4D4D' : '#BDD7EF' }}
                      />
                    }
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className='w-full my-24'>
          <CustomButton
            label='Enviar'
            width='full'
            disabled={disabled}
            onClick={updatePassword}
            className='primary'
            height='large'
          />
        </div>
      </div>
    </div>
  );
}

export default RestablecerContraseña;