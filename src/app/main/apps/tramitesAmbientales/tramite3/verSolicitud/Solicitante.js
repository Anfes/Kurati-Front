import { useEffect, useState } from "react";
import _ from "@lodash";
import { Grid, useMediaQuery, } from "@mui/material";
import DatosSolicitante from "./solicitante/DatosSolicitante";
import LegalRep from "./solicitante/LegalRep";

function Solicitante(props) {
  const {
    form,
    setForm,
    document,
    cities,
    setDisabledSolic

  } = props;

  const matches = useMediaQuery('(min-width:1800px)');
  const [emailCorrect, setEmailCorrect] = useState(undefined);
  const [emailCorrectRep, setEmailCorrectRep] = useState(undefined);
  const [error, setError] = useState(false)
  const [errorRep, setErrorRep] = useState(false)

  const disabledSolicitante =
    (form.personType === 2 ? form.personType2 === null : false) ||
    form.businessName === '' ||
    form.documentType === '' ||
    form.documentNumber === '' ||
    form.address === '' ||
    form.city === '' ||
    form.phone === '' ||
    form.email === '' ||
    (form.autNot === 1 ? form.addressNot === '' : false) ||
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
console.log('form.personType2', form.personType2)
  useEffect(() => {

    if (disabledSolicitante) {
      setDisabledSolic(true)
    } else {
      setDisabledSolic(false)
    }
  }, [disabledSolicitante, setDisabledSolic]);

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


  // ------------------------------------------------------
  const changeText = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const changeSelect = (event) => {
    setPrueba(event.target.value);
  };

  const changeFilterSelect = (prop) => (event) => {
    setForm({ ...form, [prop]: event });
  };

  const typePerson = (name) => () => {
    if (name === 'natural') {
      setForm({ ...form, personType: 1, personType2: '' })
      //1: Natural
    } else {
      setForm({ ...form, personType: 2 })
      //2: Juridica
    }
  }

  const checkPub = (name) => () => {
    if (name === 'publica') {
      setForm({ ...form, personType2: 1 })
      //1: Publica
    } else {
      setForm({ ...form, personType2: 2 })
      //2: Privada
    }
  }

  const legalRep = (name) => () => {
    if (name === 'representante') {
      setForm({ ...form, repOrApo: 1 })
      //1: Representante Legal
    } else {
      setForm({ ...form, repOrApo: 2 })
      //2: apoderado
    }
  }

  const checkCal = (name) => () => {
    if (name === 'propietario') {
      setForm({ ...form, calAct: 1 })
      //1: Propietario
    } else if (name === 'poseedor') {
      setForm({ ...form, calAct: 2 })
      //2: Poseedor
    } else {
      setForm({ ...form, calAct: 3 })
      //3: Tenedor
    }
  }

  const changeEmailnot = (name) => () => {
    if (name === 'si') {
      setForm({ ...form, autNot: 1, addressNot: form.email });
      //1: Si
    } else {
      setForm({ ...form, autNot: 0, addressNot: '' });
      //0: No
    }
  }


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

  return (
    <div>
      <div className="p-16 sm:p-0 sm:pl-28 mb-84">
        <Grid item className="flex-col justify-center items-center">
          <div className="flex " style={matches ? { flexDirection: 'row' } : { flexDirection: 'column' }}>
            {/* ------------------------------------------------------Solicitante------------------------------------                 */}
            <div className="" style={matches ? { width: '50%', marginRight: 28 } : {}}>
              <DatosSolicitante
                typePerson={typePerson}
                checkPub={checkPub}
                changeText={changeText}
                form={form}
                documentTypeOptions={documentTypeOptions}
                changeNumber={changeNumber}
                cityOptions={cityOptions}
                changeSelect={changeSelect}
                emailCorrect={emailCorrect}
                error={error}
                document={document}
                changeFilterSelect={changeFilterSelect}
                onChangeEmail={onChangeEmail}
                checkCal={checkCal}
                changeEmailnot={changeEmailnot}
              />
            </div>
            {/* ------------------------------------------------------Representante legal------------------------------------                 */}
            <div style={matches ? { width: '50%', marginRight: 28 } : {}}>
              <LegalRep
                form={form}
                legalRep={legalRep}
                documentTypeOptions={documentTypeOptions}
                changeNumber={changeNumber}
                changeText={changeText}
                expeditionPlaceOptions={expeditionPlaceOptions}
                cityOptions={cityOptions}
                emailCorrectRep={emailCorrectRep}
                errorRep={errorRep}
                document={document}
                changeFilterSelect={changeFilterSelect}
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
