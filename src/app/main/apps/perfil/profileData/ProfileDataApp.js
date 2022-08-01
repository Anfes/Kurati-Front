import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from 'react-router-dom';
import { isEmpty } from "lodash";
import { Box, Modal, Typography, useMediaQuery } from "@mui/material";

import { useDeepCompareEffect } from '@fuse/hooks';
import { useForm } from '@fuse/hooks';

import withReducer from "app/store/withReducer";
import reducer from "../store";
import { showMessage } from "app/store/fuse/messageSlice";
import { getById, updateProfile, getCitizenById, updateCitizenProfile, getAllRoles } from "../store/profileSlice";

import PersonalInfo from "./PersonalInfo";
import ValidatePhone from "./ValidatePhone";

function ProfileData() {

  const dispatch = useDispatch();
  const routeParams = useParams();
  const mediaScreen = useMediaQuery("(max-width:1280px)");
  const user = useSelector(({ auth }) => auth.user);
  const dataRedux = useSelector(({ profileApp }) => profileApp.profile);
  const itemRoles = useSelector(({ profileApp }) => profileApp.profile.dataRoles);

  // --------------------------------------------------------------------------
  const { form, handleChange, setForm } = useForm(null);
  // --------------------------------------------------------------------------
  const [showSectionPhone, setShowSectionPhone] = useState(false);
  const [emailCorrect, setEmailCorrect] = useState(false);
  const [open, setOpen] = useState(false);
  const [noProduct, setNoProduct] = useState(false);
  // --------------------------------------------------------------------------
  const genderOptions = [
    { value: 1, label: "Masculino" },
    { value: 2, label: "Femenino" },
  ];
  const documentTypeOptions = [
    { value: 1, label: "Cédula de ciudadanía" },
    { value: 3, label: "Cédula Extranjería" },
    { value: 4, label: "Pasaporte" },
    { value: 5, label: "Permiso Especial de Permanencia" },
  ];
  const documentTypeCompany = [
    { value: 6, label: "NIT" },
  ];
  const personTypeOptions = [
    { value: 1, label: "Natural" },
    { value: 2, label: "Jurídica" },
  ];
  // --------------------------------------------------------------------------
  useDeepCompareEffect(() => {
    async function fetch() {
      if (user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3) {
        await dispatch(getCitizenById(user.usr_id));
      } else {
        await dispatch(getAllRoles());
        await dispatch(getById(user.usr_id));
      }
    }
    fetch();

    return () => {

    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (
      (dataRedux.data && !form) ||
      (dataRedux.data && form && dataRedux.data.id !== form.id)
    ) {
      setForm(dataRedux.data);
    }
  }, [form, dataRedux.data, setForm]);

  function validateString(value) {
    if (value.target.value.split("")[0] === " ") {
    } else {
      handleChange(value)
    }
  }

  const rolOptions = itemRoles && itemRoles.length > 0 ? itemRoles.map(resp => ({
    label: resp.rl_rol,
    value: resp.rl_id,
  })) : [];
  // --------------------------------------------------------------------------
  const changeText = (prop) => (event) => {
    if (prop === 'personType') {
      setForm({ ...form, [prop]: event.target.value, documentType: '', documentNumber: '', empresa: '' })
    } else {
      setForm({ ...form, [prop]: event.target.value });
    }
  };
  const changeNumber = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setForm({ ...form, [prop]: event.target.value });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setForm({ ...form, [prop]: t.toString() });
      } else {
        setForm({ ...form, [prop]: "" });
      }
    }
  };
  const onChangeEmail = async (event) => {
    const caracteres =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        setEmailCorrect(false);
      } else {
        setEmailCorrect(true);
      }
    } else {
      setEmailCorrect(false);
    }
  };
  // --------------------------------------------------------------------------
  const sendDataRegister = async () => {
    if (user.fk_roles.rl_id === 2 || user.fk_roles.rl_id === 3) {
      const body = {
        us_id_tipo_documento: form.documentType,
        us_nombres: form.name,
        us_apellidos: form.lastName,
        us_documento: form.documentNumber,
        us_email: form.email,
        us_celular: `57${form.phone}`,
        us_genero: form.gender,
        us_empresa: form.personType === 1 ? null : form.empresa,
        us_tipo_persona: form.personType,
      };
      setOpen(true);
      const result = await dispatch(updateCitizenProfile(user.usr_id, body));
      if (result) {
        setOpen(false);
      }
    } else {
      const body = {
        cu_id_tipo_documento: form.documentType,
        cu_nombres: form.name,
        cu_apellidos: form.lastName,
        cu_documento: form.documentNumber,
        cu_email: form.email,
        cu_celular: `57${form.phone}`,
        cu_genero: form.gender,
        cu_id_rol: form.rol,
      };
      setOpen(true);
      const result = await dispatch(updateProfile(user.usr_id, body));
      if (result) {
        setOpen(false);
      }
    }

  };


  return (
    <div>
      <Modal
        open={open}
        onClose={null}
        style={{ backgroundColor: "rgba(225,225,225, 0.8) " }}
      >
        <Box
          className="absolute flex flex-col justify-center items-center bg-white py-12 px-52 rounded-16"
          style={{
            top: "30%",
            left: "40%",
            boxShadow: "0px 2px 16px 4px rgba(2, 62, 115, 0.1)",
          }}
        >
          <img alt="loading" src="/assets/images/dialogs/loading.png" />
          <Typography className="font-semibold text-16 mb-8">
            Estamos validando tu información
          </Typography>
          <Typography style={{ color: "#223240" }} className="mb-24">
            Esto solo tardará unos instantes
          </Typography>
        </Box>
      </Modal>
      <div className="flex flex-col lg:flex-row">
        <div
          className="min-h-136 flex bg-white"
          style={{
            width:
              showSectionPhone && mediaScreen
                ? "100%"
                : showSectionPhone
                  ? "65%"
                  : "100%",
          }}
        >
          <div className="flex flex-col w-full mx-12 mb-32">
            {!isEmpty(form) && (
              <PersonalInfo
                form={form}
                emailCorrect={emailCorrect}
                genderOptions={genderOptions}
                documentTypeOptions={documentTypeOptions}
                documentTypeCompany={documentTypeCompany}
                personTypeOptions={personTypeOptions}
                rolOptions={rolOptions}
                changeText={changeText}
                changeNumber={changeNumber}
                onChangeEmail={onChangeEmail}
                sendDataRegister={sendDataRegister}
                dataRedux={dataRedux}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withReducer("profileApp", reducer)(ProfileData);