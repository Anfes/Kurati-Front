import React from 'react';
import { InputAdornment } from '@mui/material';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CustomTextField from '@components/CustomTextField';
import CustomButton from '@components/CustomButton';

function EmailConfirm(props) {
  const { sendEmailForgotPass, setForm, form, disabled, emailCorrect, setEmailCorrect } = props;

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
      }
    } else {
      setEmailCorrect(false);
    }
  };

  return (
    <div className="w-full mb-20 min-w-320">
      <CustomTextField
        placeholder='Correo electrónico'
        value={form.email}
        style={{ backgroundColor: 'white' }}
        name='email'
        onChange={onChangeEmail}
        error={emailCorrect === false ? true : false}
        helperText={emailCorrect === false ? 'Por favor ingresa un correo electrónico valido' : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <MailOutlineRoundedIcon style={{ color: emailCorrect == false ? '#FF4D4D' : '#BDD7EF' }} />
            </InputAdornment>
          ),
        }}
      />
      <div className='w-full my-24'>
        <CustomButton
          label='Enviar'
          width='full'
          disabled={disabled}
          onClick={sendEmailForgotPass}
          className='primary'
          height='large'
        />
      </div>
    </div>
  );
}

export default EmailConfirm;