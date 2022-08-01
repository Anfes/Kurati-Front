import _ from "@lodash";
import { Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import DemandaForm from "./demandaUso/DemandaForm";
import OtrosDatos from "./demandaUso/OtrosDatos";
import OtrosFines from "./demandaUso/OtrosFines";



function DemandaUso(props) {
  const {
    setFormDemanda,
    formDemanda,
    setDisabledDemanda,
    setErrorActividad,
    domesticoArray,
    setDomesticoArray,
    riesgoArray,
    setRiesgoArray,
    acuiculturaArray,
    setAcuiculturaArray,
    abrevaderosArray,
    setAbrevaderosArray,
  } = props;
  //-----------------------------------------------------------------------------------------------------
  const mediumScreen = useMediaQuery('(min-width:1000px)')
  const smallScreen = useMediaQuery('(min-width:600px)')
  //-----------------------------------------------------------------------------------------------------
  const [abastecimientoDomestico, setAbastecimientoDomestico] = useState({
    tdua_ad_nro_permanentes: '',
    tdua_ad_nro_transitorias: '',
    tdua_ad_nroper_aprov_dia_mes: '',
  })
  const [riesgo, setRiesgo] = useState({
    tdua_rs_tipo_cultivo: '',
    tdua_rs_extension: '',
  })
  const [acuicultura, setAcuicultura] = useState({
    tdua_ap_especie: '',
    tdua_ap_produccion: '',
  })
  const [abastecimientoAbrevaderos, setAbastecimientoAbrevaderos] = useState({
    tdua_aa_tipo_animal: '',
    tdua_aa_numero: '',
  })
  //-----------------------------------------------------------------------------------------------------
  const errorFinUso = domesticoArray.length === 0 && riesgoArray.length === 0 && acuiculturaArray.length === 0 &&
    abrevaderosArray.length === 0 && formDemanda.tipoActividad === ''

  const disabled = formDemanda.cantidadAgua === '' || formDemanda.tiempoConcesion === ''
  //-----------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (disabled) {
      setDisabledDemanda(true)
    } else {
      setDisabledDemanda(false)
    }
  }, [disabled, setDisabledDemanda]);

  useEffect(() => {
    if (errorFinUso) {
      setErrorActividad(true)
    } else {
      setErrorActividad(false)
    }
  }, [errorFinUso, setErrorActividad]);


  //--------------------------------------------------------------------------------------------------------------------
  
    //--------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
      if (formDemanda.infoAbastecimientoDomestico.length > 0) {
        setDomesticoArray(formDemanda.infoAbastecimientoDomestico)
      } else {
        setDomesticoArray([])
      }
    }, [formDemanda.infoAbastecimientoDomestico]);
  
    useEffect(() => {
      if (formDemanda.infoRiegosSilvicultura.length > 0) {
        setRiesgoArray(formDemanda.infoRiegosSilvicultura)
      } else {
        setRiesgoArray([])
      }
    }, [formDemanda.infoRiegosSilvicultura]);
  
    useEffect(() => {
      if (formDemanda.infoAgriculturaPesca.length > 0) {
        setAcuiculturaArray(formDemanda.infoAgriculturaPesca)
      } else {
        setAcuiculturaArray([])
      }
    }, [formDemanda.infoAgriculturaPesca]);
  
    useEffect(() => {
      if (formDemanda.infoAbastecimientoAbrevaderos.length > 0) {
        setAbrevaderosArray(formDemanda.infoAbastecimientoAbrevaderos)
      } else {
        setAbrevaderosArray([])
      }
    }, [formDemanda.infoAbastecimientoAbrevaderos]);
  
    //--------------------------------------------------------------------------------------------------------------------
  const changeNumberDomestico = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setAbastecimientoDomestico({ ...abastecimientoDomestico, [prop]: event.target.value, });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setAbastecimientoDomestico({ ...abastecimientoDomestico, [prop]: t.toString() });
      } else {
        setAbastecimientoDomestico({ ...abastecimientoDomestico, [prop]: "" });
      }
    }
  };

  const changeNumberRiesgo = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setRiesgo({ ...riesgo, [prop]: event.target.value, });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setRiesgo({ ...riesgo, [prop]: t.toString() });
      } else {
        setRiesgo({ ...riesgo, [prop]: "" });
      }
    }
  };

  const changeNumberAcuicultura = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setAcuicultura({ ...acuicultura, [prop]: event.target.value, });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setAcuicultura({ ...acuicultura, [prop]: t.toString() });
      } else {
        setAcuicultura({ ...acuicultura, [prop]: "" });
      }
    }
  };

  const changeNumberAbrevaderos = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setAbastecimientoAbrevaderos({ ...abastecimientoAbrevaderos, [prop]: event.target.value, });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setAbastecimientoAbrevaderos({ ...abastecimientoAbrevaderos, [prop]: t.toString() });
      } else {
        setAbastecimientoAbrevaderos({ ...abastecimientoAbrevaderos, [prop]: "" });
      }
    }
  };

  const changeTextRiesgo = (prop) => (event) => {
    setRiesgo({ ...riesgo, [prop]: event.target.value });
  };

  const changeTextAcuicultura = (prop) => (event) => {
    setAcuicultura({ ...acuicultura, [prop]: event.target.value });
  };

  const changeTextAbastecimientoAbrevaderos = (prop) => (event) => {
    setAbastecimientoAbrevaderos({ ...abastecimientoAbrevaderos, [prop]: event.target.value });
  };

  const addDomestico = () => {
    setDomesticoArray(
      domesticoArray.concat(abastecimientoDomestico)
    )
    setAbastecimientoDomestico({ ...abastecimientoDomestico, permanentes: '', transitorias: '', aprovechamiento: '' })
  }

  const addRiesgo = () => {
    setRiesgoArray(
      riesgoArray.concat(riesgo)
    )
    setRiesgo({ ...riesgo, tipoCultivo: '', extension: '', })
  }

  const addAcuicultura = () => {
    setAcuiculturaArray(
      acuiculturaArray.concat(acuicultura)
    )
    setAcuicultura({ ...acuicultura, especie: '', produccion: '' })
  }

  const addAbrevaderos = () => {
    setAbrevaderosArray(
      abrevaderosArray.concat(abastecimientoAbrevaderos)
    )
    setAbastecimientoAbrevaderos({ ...abastecimientoAbrevaderos, tipoAnimales: '', numero: '' })
  }

  const delItemDomestico = (i) => () => {
    const newArray = [...domesticoArray];
    newArray.splice(i, 1)
    setDomesticoArray(newArray);
  }

  const delItemRiesgo = (i) => () => {
    const newArray = [...riesgoArray];
    newArray.splice(i, 1)
    setRiesgoArray(newArray);
  }

  const delItemAcuicultura = (i) => () => {
    const newArray = [...acuiculturaArray];
    newArray.splice(i, 1)
    setAcuiculturaArray(newArray);
  }

  const delItemAbrevaderos = (i) => () => {
    const newArray = [...abrevaderosArray];
    newArray.splice(i, 1)
    setAbrevaderosArray(newArray);
  }

  const changeText = (prop) => (event) => {
    setFormDemanda({ ...formDemanda, [prop]: event.target.value });
  };

  const changeNumber = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setFormDemanda({ ...formDemanda, [prop]: event.target.value, });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setFormDemanda({ ...formDemanda, [prop]: t.toString() });
      } else {
        setFormDemanda({ ...formDemanda, [prop]: "" });
      }
    }
  };


  const checkedActividad = (name) => () => {
    if (name === 'usoIndustrial') {
      setFormDemanda({ ...formDemanda, tipoActividad: 1 })
      //1: Uso industrial
    } else if (name === 'termicaNuclear') {
      setFormDemanda({ ...formDemanda, tipoActividad: 2 })
      //2: Generación térmica o nuclear de electricidad
    } else if (name === 'minera') {
      setFormDemanda({ ...formDemanda, tipoActividad: 3 })
      //3: Explotación minera y tratamiento de minerales
    } else if (name === 'petrolera') {
      setFormDemanda({ ...formDemanda, tipoActividad: 4 })
      //4: Explotación petrolera
    } else if (name === 'geotermica') {
      setFormDemanda({ ...formDemanda, tipoActividad: 5 })
      //5: Inyección para generación geotermica
    } else if (name === 'transporteMinerales') {
      setFormDemanda({ ...formDemanda, tipoActividad: 6 })
      //6: Transporte de minerales y sustancias tóxicas
    } else if (name === 'hidroelectrica') {
      setFormDemanda({ ...formDemanda, tipoActividad: 7 })
      //7: Generación hidroeléctrica
    } else if (name === 'cineticaDirecta') {
      setFormDemanda({ ...formDemanda, tipoActividad: 8 })
      //8: Generación cinética directa
    } else if (name === 'maderas') {
      setFormDemanda({ ...formDemanda, tipoActividad: 9 })
      //9: Flotación de maderas
    } else {
      setFormDemanda({ ...formDemanda, tipoActividad: 10 })
      //10: Usos medicinales
    }
  }

  const changeTiempo = (name) => () => {
    if (name === 'meses') {
      setFormDemanda({ ...formDemanda, mesAno: 1 })
      //1: Meses
    } else {
      setFormDemanda({ ...formDemanda, mesAno: 2 })
      //2: Años
    }
  }

  const changePueaa = (name) => () => {
    if (name === 'pueaa') {
      setFormDemanda({ ...formDemanda, tipoAnexo: 1 })
    } else {
      setFormDemanda({ ...formDemanda, tipoAnexo: 2 })
    }
  }
  //-------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <div className="p-16 sm:p-24 ">
        <Typography className='font-bold text-14 mb-16' style={{ color: '#4C647A' }}>Demanda de uso del agua :</Typography>
        <div className={mediumScreen?"flex":'flex flex-col'}>
          <div className={mediumScreen?"flex w-1/2 mb-28": "flex w-full mb-28"}>
            <DemandaForm
              mediumScreen={mediumScreen}
              abastecimientoDomestico={abastecimientoDomestico}
              riesgo={riesgo}
              acuicultura={acuicultura}
              abastecimientoAbrevaderos={abastecimientoAbrevaderos}
              domesticoArray={domesticoArray}
              riesgoArray={riesgoArray}
              acuiculturaArray={acuiculturaArray}
              abrevaderosArray={abrevaderosArray}
              changeNumberDomestico={changeNumberDomestico}
              changeNumberRiesgo={changeNumberRiesgo}
              changeNumberAcuicultura={changeNumberAcuicultura}
              changeNumberAbrevaderos={changeNumberAbrevaderos}
              changeTextRiesgo={changeTextRiesgo}
              changeTextAcuicultura={changeTextAcuicultura}
              changeTextAbastecimientoAbrevaderos={changeTextAbastecimientoAbrevaderos}
              addDomestico={addDomestico}
              addRiesgo={addRiesgo}
              addAcuicultura={addAcuicultura}
              addAbrevaderos={addAbrevaderos}
              delItemDomestico={delItemDomestico}
              delItemRiesgo={delItemRiesgo}
              delItemAcuicultura={delItemAcuicultura}
              delItemAbrevaderos={delItemAbrevaderos}
            />
          </div>
          <div className={mediumScreen?"flex flex-col w-1/2 mb-28": "flex flex-col w-full mb-28"}>

            <div className="flex mb-16">
              <OtrosFines
                checkedActividad={checkedActividad}
                mediumScreen={mediumScreen}
                formDemanda={formDemanda}
                changeText={changeText}
                smallScreen={smallScreen}
              />
            </div>
            <OtrosDatos
              changeTiempo={changeTiempo}
              changeNumber={changeNumber}
              formDemanda={formDemanda}
              changePueaa={changePueaa}
              smallScreen={smallScreen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DemandaUso;
