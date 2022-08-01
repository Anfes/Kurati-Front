import React, { useEffect } from 'react';
import { getAllRoles } from './store/RegistroFuncionarioSlice';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';

import { InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import CustomSelect from '@components/CustomSelect';
import CustomTextField from '@components/CustomTextField';

function PersonalInfo(props) {
    const { form, setForm, validatePassword, setValidatePassword, errorPass, setErrorPass, disabledFields, passwordDiferent } = props;
    const dispatch = useDispatch();
    const itemRoles = useSelector(({ roles }) => roles.registroFuncionario.dataRoles);

    useEffect(() => {
        async function fetch() {
            await dispatch(getAllRoles())
        }
        fetch()
    }, []);

    const genderOptions = [
        { value: 1, label: "Masculino" },
        { value: 2, label: "Femenino" },
    ];
    const corporationOptions = [
        { value: 1, label: "Cortolima" },
    ];
    const documentTypeOptions = [
        { value: 1, label: "Cédula de ciudadanía" },
        { value: 3, label: "Cédula Extranjería" },
        { value: 4, label: "Pasaporte" },
        { value: 5, label: "Permiso Especial de Permanencia" },
    ];

    const RolOptions = itemRoles && itemRoles.length > 0 ? itemRoles.map(resp => ({
        label: resp.rl_rol,
        value: resp.rl_id,
    })) : [];

    const changeText = (prop) => (event) => {
        setForm({ ...form, [prop]: event.target.value })
    };

    const handleClickShowPassword = (key) => () => {
        setForm({ ...form, [key]: !form[key] });
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
                        messagePasswordError: "La contraseña debe ser debe ser alfanumerico, hace falta almenos una letra",
                        passwordCorrect: true,
                    });
                    setErrorPass(true)
                }
            } else {
                setValidatePassword({
                    ...validatePassword,
                    messagePasswordError: "La contraseña debe ser debe ser alfanumerico, hace falta almenos un numero",
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

    const changeNumber = (event) => {
        if (event.target.value.length === 0) {
            setForm({ ...form, documentNumber: event.target.value, });
        } else {
            const t = parseInt(event.target.value, 10);
            if (!Number.isNaN(t)) {
                setForm({ ...form, documentNumber: t.toString() });
            } else {
                setForm({ ...form, documentNumber: "" });
            }
        }
    };

    return (
        <div className='flex flex-col'>
            <p className='font-bold text-primary text-14 my-32'>
                Información personal
            </p>
            <div className='w-full flex flex-col md:flex-row justify-between'>
                <div className='w-full lg:w-1/9'>
                    <CustomSelect
                        disabled={disabledFields}
                        label='Seleccione Corporación'
                        options={corporationOptions}
                        value={form.corporation}
                        onChange={changeText('corporation')}
                        name='corporation'
                    />
                </div>
                <div className='w-full lg:w-1/9 my-12 md:my-0 md:mx-10'>
                    <CustomSelect
                        disabled={disabledFields}
                        label='Rol'
                        options={RolOptions}
                        value={form.rol}
                        onChange={changeText('rol')}
                        name='rol'
                    />
                </div>
                <div className='w-full lg:w-1/9'>
                    <CustomSelect
                        disabled={disabledFields}
                        value={form.documentType}
                        onChange={changeText('documentType')}
                        name='documentType'
                        label='Tipo de documento'
                        options={documentTypeOptions}
                    />
                </div>
            </div>
            <div className='w-full flex flex-col md:flex-row justify-between mt-12 md:mt-36'>
                <div className='w-full lg:w-1/9'>
                    <CustomTextField
                        disabled={disabledFields}
                        label='Número de documento'
                        onChange={changeNumber}
                        value={form.documentNumber}
                        name='documentNumber'
                    />
                </div>
                <div className='w-full lg:w-1/9 my-12 md:my-0 md:mx-10'>
                    <CustomTextField
                        disabled={disabledFields}
                        label='Nombres'
                        value={form.name}
                        onChange={changeText('name')}
                    />
                </div>
                <div className='w-full lg:w-1/9'>
                    <CustomTextField
                        disabled={disabledFields}
                        onChange={changeText('lastName')}
                        value={form.lastName}
                        label='Apellidos'
                    />
                </div>
            </div>
            <div className='w-full flex flex-col md:flex-row justify-between mt-12 md:mt-36'>
                <div className='w-full lg:w-1/9'>
                    <CustomSelect
                        disabled={disabledFields}
                        label='Género'
                        value={form.gender}
                        name='gender'
                        onChange={changeText('gender')}
                        options={genderOptions}
                    />
                </div>
                <div className='w-full lg:w-1/9 my-12 md:my-0 mx-0 md:mx-10'>
                    <CustomTextField
                        disabled={disabledFields}
                        onChange={handlePasswordChange}
                        helperText={form.password ? validatePassword.messagePasswordError : ""}
                        value={form.password}
                        label='Contraseña'
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
                </div>
                <div className='w-full lg:w-1/9'>
                    <CustomTextField
                        disabled={disabledFields}
                        onChange={changeText('confirmPasword')}
                        value={form.confirmPasword}
                        type={form.showConfirmPassword ? 'text' : 'password'}
                        minLength={8}
                        helperText={form.confirmPasword && form.confirmPasword !== form.password ? 'Las contraseñas no coinciden' : ''}
                        error={form.confirmPasword && form.confirmPasword !== form.password ? true : form.confirmPasword ? errorPass : null}
                        label='Confirmar Contraseña'
                        endAdornment={
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
                        }
                    />
                </div>
            </div>

        </div>
    );
}
export default withReducer('roles', reducer)(PersonalInfo);
