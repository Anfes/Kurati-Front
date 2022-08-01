import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputAdornment, IconButton, useMediaQuery } from "@mui/material";

import CustomSelect from "@components/CustomSelect";
import CustomTextField from "@components/CustomTextField";
import CustomButton from "@components/CustomButton";

function PersonalInfo(props) {
  const {
    form, emailCorrect,
    genderOptions, documentTypeOptions, documentTypeCompany, personTypeOptions,
    changeText, changeNumber, onChangeEmail, sendDataRegister, rolOptions, dataRedux
  } = props;
  const user = useSelector(({ auth }) => auth.user);
  const smallScreen = useMediaQuery('(min-width:750px)');

  const [disCompare, setDiscompare] = useState(false)
  const [data, setData] = useState(dataRedux.data)


  useEffect(() => {
    if (
      JSON.stringify(data) !== JSON.stringify(form)
    ) {
      setDiscompare(false);
    } else {
      setDiscompare(true);
    }
  }, [form, setDiscompare, data]);

  return (
    <div className={smallScreen ? "flex flex-col min-w-512" : "flex flex-col "}>
      <p className="font-bold text-primary text-14 mb-32 mt-16">
        Información personal
      </p>

      <div className={smallScreen ? "w-full flex justify-between" : "w-full flex flex-col justify-between"}>

        <div style={smallScreen ? { width: "29%" } : { marginBottom: 16 }}>
          {(user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3) ?
            <CustomSelect
              label="Tipo de persona"
              options={personTypeOptions}
              value={form.personType}
              onChange={changeText("personType")}
              name="personType"
            />
            :
            <CustomSelect
              value={form.rol}
              onChange={changeText('rol')}
              name='rol'
              label='Rol'
              options={rolOptions}
            />
          }
        </div>
        <div style={smallScreen ? { width: "29%" } : { marginBottom: 16 }}>
          <CustomSelect
            value={form.documentType}
            onChange={changeText("documentType")}
            name="documentType"
            label="Tipo de documento"
            options={form.personType === 2 ? documentTypeCompany : documentTypeOptions}
          />
        </div>
        <div style={smallScreen ? { width: "29%" } : { marginBottom: 16 }}>
          <CustomTextField
            label="Número de documento"
            onChange={changeNumber("documentNumber")}
            value={form.documentNumber}
            name="documentNumber"
          />
        </div>
      </div>
      {(user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3) && form.personType === 2 ?
        <div className={smallScreen ? "w-full mt-36" : null} style={smallScreen ? null : { marginBottom: 16 }} >
          <CustomTextField
            label="Empresa"
            value={form.empresa}
            onChange={changeText("empresa")}
          />
        </div> : null
      }
      <div className={smallScreen ? "w-full flex justify-between mt-36" : "w-full flex flex-col justify-between"}>
        <div style={smallScreen ? { width: "29%" } : { marginBottom: 16 }}>
          <CustomTextField
            label="Nombres"
            value={form.name}
            onChange={changeText("name")}
          />
        </div>
        <div style={smallScreen ? { width: "29%" } : { marginBottom: 16 }}>
          <CustomTextField
            onChange={changeText("lastName")}
            value={form.lastName}
            label="Apellidos"
          />
        </div>
        <div style={smallScreen ? { width: "29%" } : { marginBottom: 16 }}>
          <CustomSelect
            label="Género"
            value={form.gender}
            name="gender"
            onChange={changeText("gender")}
            options={genderOptions}
          />
        </div>
      </div>
      <p className="font-bold text-primary text-14 mt-40 mb-32">
        Información de contacto
      </p>
      <div className={smallScreen ? "w-full flex justify-between" : "w-full flex flex-col justify-between"}>
        <div className="flex" style={smallScreen ? { width: "45%" } : null}>

          <div
            className="w-56 h-56 rounded-8 flex justify-center items-center"
            style={{ border: "1px solid #BDD7EF", background: "#F9FCFF" }}
          >
            <p className="text-primaryBlack text-16">+57</p>
          </div>
          <div className={smallScreen ? "mx-14 w-1/9" : null} style={smallScreen ? { width: "100%" } : { marginBottom: 16, marginLeft: 4, width: "100%" }}>
            <CustomTextField
              label="Número de teléfono"
              onChange={changeNumber("phone")}
              maxLenght="10"
              name="phone"
              value={form.phone}
            />
          </div>
        </div>
        <div style={smallScreen ? { width: "55%" } : { marginBottom: 16 }}>
          <CustomTextField
            label="Correo electrónico"
            value={form.email}
            name="email"
            onChange={onChangeEmail}
            error={emailCorrect && form.email !== "" ? true : null}
            helperText={
              emailCorrect && form.email !== ""
                ? "Por favor ingresa un correo electrónico valido"
                : ""
            }
          />
        </div>
      </div>
     {smallScreen? '':<div className="h-60"/>}
      <div
        className="py-12 my-12 w-full"
        style={{ borderTop: "1px solid  rgba(229, 229, 229, 0.35)" }}
      >
        <div style={{ position: smallScreen ? 'inherit' : 'fixed', top: '81%', bottom: 0, width:'100%',  }} className={smallScreen?'flex items-center justify-end':"flex flex-col items-end z-50 bg-white "} >
          <div style={{marginTop:smallScreen?0:4, marginRight:smallScreen?0:'14%'}}>

          <CustomButton
            label="Actualizar datos"
            className="primary"
            disabled={
              
              (user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3) ?
              form.personType === "" || form.documentType === "" || form.documentNumber === "" ||
              form.name === "" || form.lastName === "" || form.gender === "" ||
              form.phone === "" || form.email === "" || emailCorrect || disCompare
              :
              form.documentType === "" || form.documentNumber === "" ||
              form.name === "" || form.lastName === "" || form.gender === "" ||
              form.phone === "" || form.email === "" || emailCorrect || disCompare
            }
            height="large"
            onClick={sendDataRegister}
            />
            </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
