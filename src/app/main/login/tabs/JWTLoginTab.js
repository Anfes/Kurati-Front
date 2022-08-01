import { useEffect, useState } from 'react';
import * as yup from 'yup';
import _ from '@lodash';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

import { InputAdornment, IconButton, Hidden } from '@mui/material';

import { submitLogin } from 'app/auth/store/loginSlice';

import CustomTextField from '@components/CustomTextField';
import CustomButton from '@components/CustomButton';
import { PadlockIcon } from '@components/FuseSvgIcon';

import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Por favor ingrese su contraseña.')
    .min(8, 'La contraseña debe ser mayor a 8 caracteres'),
});

const defaultValues = {
  email: '',
  password: '',
};

function JWTLoginTab(props) {
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);
  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValue('email', '');
    setValue('password', '');
  }, [reset, setValue, trigger]);

  useEffect(() => {
    login.errors.forEach((error) => {
      setError(error.type, {
        type: 'manual',
        message: error.message,
      });
    });
  }, [login.errors, setError]);

  function onSubmit(model) {
    dispatch(submitLogin(model));
  }

  return (
    <div className="w-full mb-20">
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className='h-80 max-w-320 w-320'>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                type="text"
                error={!!errors.email}
                style={{backgroundColor:'white'}}
                helperText={errors?.email?.message}
                placeholder="Correo electrónico"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineRoundedIcon style={{ color: !!errors.email ? '#FF4D4D' : '#BDD7EF' }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
        <div className='h-80 max-w-320 mb-10 w-320'>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <CustomTextField
              {...field}
              style={{backgroundColor:'white'}}
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors?.password?.message}
                variant="outlined"
                placeholder='Contraseña'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PadlockIcon
                        fill={!!errors.password ? '#FF4D4D' : '#BDD7EF'}
                        height='20'
                        width='20'
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                        {showPassword ?
                          <VisibilityOutlinedIcon style={{ color: !!errors.password ? '#FF4D4D' : '#BDD7EF' }} /> :
                          <VisibilityOffOutlinedIcon style={{ color: !!errors.password ? '#FF4D4D' : '#BDD7EF' }} />
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            )}
          />
        </div>
        <Hidden mdDown>
          <>
            <div className='w-full text-right mb-20'>
              <Link
                className="font-bold text-14"
                to="/olvidar-contrasena"
                style={{ color: '#145C9C', textDecoration: 'none' }}
              >
                Olvidé mi contraseña
              </Link>
            </div>
            <div className='max-w-160 self-end justify-end'>
              <CustomButton
                type="submit"
                width='full'
                height='large'
                className="primary"
                label="Iniciar sesión"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                value="legacy"
              />
            </div>
          </>
        </Hidden>
        <Hidden mdUp>
          <>
            <div className='w-full'>
              <CustomButton
                type="submit"
                width='full'
                height='large'
                className="primary"
                label="Iniciar sesión"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                value="legacy"
              />
            </div>
            <div className='w-full text-right mt-20'>
              <Link
                className="font-bold text-14"
                to="/olvidar-contrasena"
                style={{ color: '#B2DBFF', textDecoration: 'none' }}
              >
                Olvidé mi contraseña
              </Link>
            </div>
          </>
        </Hidden>
      </form>

      {/* <table className="w-full mt-32 text-center">
        <thead className="mb-4">
          <tr>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Role
              </Typography>
            </th>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Email
              </Typography>
            </th>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Password
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography className="font-medium text-11" color="textSecondary">
                Admin
              </Typography>
            </td>
            <td>
              <Typography className="text-11">admin@fusetheme.com</Typography>
            </td>
            <td>
              <Typography className="text-11">admin</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography className="font-medium text-11" color="textSecondary">
                Staff
              </Typography>
            </td>
            <td>
              <Typography className="text-11">staff@fusetheme.com</Typography>
            </td>
            <td>
              <Typography className="text-11">staff</Typography>
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default JWTLoginTab;
