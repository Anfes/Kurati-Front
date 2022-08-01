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
    domesticoArray,
    setDomesticoArray,
    riesgoArray,
    setRiesgoArray,
    acuiculturaArray,
    setAcuiculturaArray,
    abrevaderosArray,
    setAbrevaderosArray,
    setDisabledDemanda,
  } = props;
  //-----------------------------------------------------------------------------------------------------
  const largeScreen = useMediaQuery('(min-width:1800px)')
  const mediumScreen = useMediaQuery('(min-width:1400px)')
  const smallScreen = useMediaQuery('(min-width:960px)')
  const verySmallScreen = useMediaQuery('(min-width:630px)')
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
  const errorFinUso = (domesticoArray.length === 0 && riesgoArray.length === 0 && acuiculturaArray.length === 0 && abrevaderosArray.length === 0)
    || formDemanda.tipoActividad === '' || (formDemanda.tipoActividad === 11 ? formDemanda.descripcionFinUso === '' : null) || formDemanda.cantidadAgua === ''
    || formDemanda.tiempoConcesion === '' || formDemanda.mesAno === ''
    || formDemanda.tipoAnexo === ''

  useEffect(() => {
    if (errorFinUso) {
      setDisabledDemanda(true)
    } else {
      setDisabledDemanda(false)
    }
  }, [errorFinUso, setDisabledDemanda]);

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

  const checkedUso = (value) => () => {
    setFormDemanda({ ...formDemanda, tipoActividad: value, descripcionFinUso: '' })
  }

  const changeText = (prop) => (event) => {
    setFormDemanda({ ...formDemanda, [prop]: event.target.value, tipoActividad: 11 });
  };

  const changeTiempo = (name) => () => {
    if (name === 'mes') {
      setFormDemanda({ ...formDemanda, mesAno: 1 })
    } else {
      setFormDemanda({ ...formDemanda, mesAno: 2 })
    }
  }

  const changeTipoAnexo = (name) => () => {
    if (name === 'PUEAA') {
      setFormDemanda({ ...formDemanda, tipoAnexo: 1 })
    } else {
      setFormDemanda({ ...formDemanda, tipoAnexo: 2 })
    }
  }

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
    setAbastecimientoDomestico({ tdua_ad_nro_permanentes: '', tdua_ad_nro_transitorias: '', tdua_ad_nroper_aprov_dia_mes: '' })
  }
  const addRiesgo = () => {
    setRiesgoArray(
      riesgoArray.concat(riesgo)
    )
    setRiesgo({ tdua_rs_tipo_cultivo: '', tdua_rs_extension: '', })
  }
  const addAcuicultura = () => {
    setAcuiculturaArray(
      acuiculturaArray.concat(acuicultura)
    )
    setAcuicultura({ tdua_ap_especie: '', tdua_ap_produccion: '' })
  }
  const addAbrevaderos = () => {
    setAbrevaderosArray(
      abrevaderosArray.concat(abastecimientoAbrevaderos)
    )
    setAbastecimientoAbrevaderos({ tdua_aa_tipo_animal: '', tdua_aa_numero: '' })
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

  //-------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <div className="p-16 sm:p-24 ">
        <Typography className='font-bold text-14 mb-16' style={{ color: '#4C647A' }}>Demanda de uso del agua :</Typography>
        <div className="flex">
          <div className="flex w-1/2 mb-28" >
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
          <div className="w-1/2 mb-28">
            <div className="flex mb-16">
              <OtrosFines
                formDemanda={formDemanda}
                changeText={changeText}
                checkedUso={checkedUso}
              />
            </div>
            <OtrosDatos
              formDemanda={formDemanda}
              changeNumber={changeNumber}
              changeTiempo={changeTiempo}
              changeTipoAnexo={changeTipoAnexo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DemandaUso;
