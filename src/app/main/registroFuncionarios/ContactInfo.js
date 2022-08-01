import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CustomTextField from '@components/CustomTextField';
import CustomCheckBox from '@components/CustomCheckBox';

function ContactInfo(props) {
    const { form, setForm, emailCorrect, setEmailCorrect, setDialogTerms, setDialogPolit, disabledFields, errorPhone } = props;
    const [error, setError] = useState(false);

    const changeNumber = (event) => {
        if (event.target.value.length === 0) {
            setForm({ ...form, phone: event.target.value, });
        } else {
            const t = parseInt(event.target.value, 10);
            if (!Number.isNaN(t)) {
                setForm({ ...form, phone: t.toString() });
            } else {
                setForm({ ...form, phone: "" });
            }
        }
    };

    const onChangeEmail = async (event) => {
        const caracteres = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const t = event.currentTarget.value.split(" ");
        let text = "";
        t.map((r) => {
            if (r !== "") {
                text += r;
            }
        });
        setForm({ ...form, email: text.toLowerCase() });
        if (text !== "") {
            if (caracteres.test(text)) {
                setEmailCorrect(true);
            } else {
                setEmailCorrect(false);
                setError(true)
            }
        } else {
            setError(true)
            setEmailCorrect(false);
        }
    };


    return (
        <div className='flex flex-col pb-60'>
            <p className='font-bold text-primary text-14 mt-40 mb-32'>
                Información de contacto
            </p>
            <div className='w-full flex flex-col md:flex-row justify-between'>
                <div
                    className='w-56 h-56 rounded-8 flex justify-center items-center'
                    style={{ border: '1px solid #BDD7EF', background: '#F9FCFF' }}
                >
                    <p className='text-primaryBlack text-16'>
                        +57
                    </p>
                </div>
                <div className='md:mx-14 w-full lg:w-1/9 mt-12 md:mt-0'>
                    <CustomTextField
                        disabled={disabledFields}
                        label='Número de teléfono'
                        onChange={changeNumber}
                        maxLenght='10'
                        name='phone'
                        value={form.phone}
                        error={form.phone !== '' ? errorPhone : null}
                        inputProps={{
                            maxlength: 10,
                            minlength: 10,
                        }}

                    />
                </div>
                <div className='w-full lg:w-7/12 my-14 md:my-0 md:mx-10'>
                    <CustomTextField
                        disabled={disabledFields}
                        label='Correo electrónico'
                        value={form.email}
                        name='email'
                        onChange={onChangeEmail}
                        error={emailCorrect === false && form.email !== '' ? error : null}
                        helperText={emailCorrect === false && form.email !== '' ? 'Por favor ingresa un correo electrónico valido' : ''}
                    />
                </div>
            </div>
            <div className='flex items-start mt-40'>
                <CustomCheckBox
                    disabled={disabledFields}
                    checked={form.termsConditions}
                    onChange={e => setForm({ ...form, termsConditions: e.target.checked })}
                />
                <div className='ml-9 flex flex-wrap'>
                    Acepto los&nbsp;
                    <p
                        className="font-bold cursor-pointer"
                        onClick={() => { setDialogTerms(true) }}
                        style={{ color: '#243161', textDecoration: 'none' }}
                    >
                        terminos y condiciones
                    </p>
                    &nbsp;de uso de nuestros servicios y el manejo de sus datos personales acorde a nuestra&nbsp;
                    <p
                        className="font-bold cursor-pointer"
                        onClick={() => { setDialogPolit(true) }}
                        style={{ color: '#243161', textDecoration: 'none' }}
                    >
                        política de tratamiento de datos personales.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;
