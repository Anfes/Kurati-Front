import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { Typography, Button, Grid, useMediaQuery, } from "@mui/material";
import DatosSolicitante from "./solicitante/DatosSolicitante";
import LegalRep from "./solicitante/LegalRep";

function Solicitante(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const {
    document,
    cities,
    form,
    setForm,
    setDisabledSolic
  } = props;
  //-------------------------------------------------------------------------------------
  const matches = useMediaQuery('(min-width:1800px)');
  //-------------------------------------------------------------------------------------
  const [emailCorrect, setEmailCorrect] = useState(undefined);
  const [emailCorrectRep, setEmailCorrectRep] = useState(undefined);
  const [error, setError] = useState(false)
  const [errorRep, setErrorRep] = useState(false)
  //-------------------------------------------------------------------------------------
  const disabledSolicitante =
    (form.personType === 2 ? form.personType2 === '' : null) ||
    form.businessName === '' ||
    form.documentType === '' ||
    form.documentNumber === '' ||
    form.address === '' ||
    form.city === '' ||
    form.phone === '' ||
    form.email === '' ||
    (form.autNot === 1 ? form.addressNot === '':false) ||
    form.calAct === '' ||
    form.nameRep === '' ||
    form.documentTypeRep === '' ||
    form.documentNumberRep === '' ||
    form.expeditionPlaceRep === '' ||
    form.addressRep === '' ||
    form.cityRep === '' ||
    form.phoneRep === '' ||
    form.emailRep === '' ||
    emailCorrect === false || 
    emailCorrectRep === false
  //-------------------------------------------------------------------------------------

  useEffect(() => {
    if (disabledSolicitante) {
      setDisabledSolic(true)
    } else {
      setDisabledSolic(false)
    }
  }, [disabledSolicitante]);

  //---------------------------------------------------------------------------------------
  const documentTypeOptions = document ? document.map(resp => ({
    value: resp.tsd_id,
    label: resp.tsd_descripcion,
  })) : [];
  const expeditionPlaceOptions = cities ? cities.map(resp2 => ({
    value: resp2.cty_id,
    label: resp2.cty_name,
  })) : [];

  const cityOptions = cities ? cities.map(resp3 => ({
    value: resp3.cty_id,
    label: resp3.cty_name,
  })) : [];

  //-------------------------------------------------------------------------------------
  const typePerson = (name) => () => {
    if (name === 'natural') {
      // 1: natural
      setForm({ ...form, personType: 1, personType2: '' });
    } else {
      // 2: juridico
      setForm({ ...form, personType: 2 });
    }
  }

  const checkPub = (name) => () => {
    if (name === 'publica') {
      // 1: Pública
      setForm({ ...form, personType2: 1 });
    } else {
      //  2: Privada
      setForm({ ...form, personType2: 2 });
    }
  }

  const changeText = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const changeFilterSelect = (prop) => (event) => {
    setForm({ ...form, [prop]: event });
  };

  const changeNumber = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setForm({ ...form, [prop]: event.target.value, });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setForm({ ...form, [prop]: t.toString() });
      } else {
        setForm({ ...form, [prop]: "" });
      }
    }
  };

  const onChangeEmail = (prop) => async (event) => {
    const caracteres = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const t = event.currentTarget.value.split(" ");
    let text = "";
    t.map((r) => {
      if (r !== "") {
        text += r;
      }
    });
    setForm({ ...form, [prop]: text.toLowerCase() });

    if (prop === 'email') {
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
    } else {
      if (text !== "") {
        if (caracteres.test(text)) {
          setEmailCorrectRep(true);
        } else {
          setEmailCorrectRep(false);
          setErrorRep(true)
        }
      } else {
        setErrorRep(true)
        setEmailCorrectRep(false);
      }
    }
  };

  const changeEmailnot = (name) => () => {
    if (name === 'si') {
      setForm({ ...form, autNot: 1, addressNot: '' });
    } else {
      setForm({ ...form, autNot: 0 });
    }
  }

  const checkCal = (name) => () => {
    if (name === 'propietario') {
      setForm({ ...form, calAct: 1 });
    } else if (name === 'poseedor') {
      setForm({ ...form, calAct: 2 });
    } else {
      setForm({ ...form, calAct: 3 });
    }
  }

  const legalRep = (name) => () => {
    if (name === 'representante') {
      // 1: Representante Legal
      setForm({ ...form, repOrApo: 1 });
    } else {
      //  2: Apoderado
      setForm({ ...form, repOrApo: 2 });
    }
  }
  //-------------------------------------------------------------------------------------

  return (
    <div>
      <div className="p-16 sm:p-24 ">
        <Grid item className="flex-col justify-center items-center">
          <div className="flex " style={matches ? { flexDirection: 'row' } : { flexDirection: 'column' }}>
            {/* ------------------------------------------------------Solicitante------------------------------------                 */}
            <div className="mb-28" style={matches ? { width: '50%', marginRight: 28 } : {}}>
              <DatosSolicitante
                documentTypeOptions={documentTypeOptions}
                cityOptions={cityOptions}
                form={form}
                typePerson={typePerson}
                checkPub={checkPub}
                changeText={changeText}
                changeFilterSelect={changeFilterSelect}
                changeNumber={changeNumber}
                onChangeEmail={onChangeEmail}
                changeEmailnot={changeEmailnot}
                checkCal={checkCal}
                emailCorrect={emailCorrect}
                error={error}
              />
            </div>
            {/* ------------------------------------------------------Representante legal------------------------------------                 */}
            <div style={matches ? { width: '50%', marginRight: 28 } : {}}>
              <LegalRep
                documentTypeOptions={documentTypeOptions}
                cityOptions={cityOptions}
                expeditionPlaceOptions={expeditionPlaceOptions}
                form={form}
                changeText={changeText}
                changeFilterSelect={changeFilterSelect}
                changeNumber={changeNumber}
                emailCorrectRep={emailCorrectRep}
                errorRep={errorRep}
                legalRep={legalRep}
                onChangeEmail={onChangeEmail}
              />
            </div>
          </div>
          <div className="flex " style={matches ? { flexDirection: 'row' } : { flexDirection: 'column' }}>
          </div>
        </Grid>
        <div className="absolute bg-red " style={{ margin: '0 auto', bottom: 0 }}></div>
      </div>
    </div>
  );
}

export default Solicitante;
