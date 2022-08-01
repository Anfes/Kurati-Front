import _ from "@lodash";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import InfoPuntoCaptacion from "./infoCaptacion/InfoPuntoCaptacion";

function PuntoCaptacion(props) {
  const {
    formInfoCap,
    setFormInfoCap,
    arrayCoor,
    setArrayCoor,
    setDisabledCaptacion
  } = props;

  const [coordenada, setCoordenada] = useState({
    tipc_lat_grad: '',
    tipc_lat_min: '',
    tipc_lat_seg: '',
    tipc_lon_grad: '',
    tipc_lon_min: '',
    tipc_lon_seg: '',
    tipc_alt: '',
  });

  const disExpedicion = (formInfoCap.fechaExpedicion !== '' ? formInfoCap.numeroExpedicion === '' : false) ||
    (formInfoCap.numeroExpedicion !== '' ? formInfoCap.fechaExpedicion === '' : false)

  useEffect(() => {
    if (disExpedicion) {
      setDisabledCaptacion(true)
    } else {
      setDisabledCaptacion(false)
    }
  }, [setDisabledCaptacion, disExpedicion]);

  useEffect(() => {
    if (formInfoCap.infoCoordenada.length > 0) {
      setArrayCoor(formInfoCap.infoCoordenada)
    } else {
      setArrayCoor([])
    }
  }, [formInfoCap.infoCoordenada]);

  // ------------------------------------------------------------------------
  const changeNumberCoor = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setCoordenada({ ...coordenada, [prop]: event.target.value, });
    } else {
      const t = Math.sign(event.target.value);
      if (!Number.isNaN(t) || event.target.value == '-') {
        setCoordenada({ ...coordenada, [prop]: event.target.value });
      }
    }
  };

  const checkedPuntoAgua = (name) => () => {
    if (name === 'manantial') {
      setFormInfoCap({ ...formInfoCap, tipoPuntoAgua: 1, otroCual: '' })
    } else if (name === 'aljibe') {
      setFormInfoCap({ ...formInfoCap, tipoPuntoAgua: 2, otroCual: '' })
    } else if (name === 'pozo') {
      setFormInfoCap({ ...formInfoCap, tipoPuntoAgua: 3, otroCual: '' })
    } else if (name === 'residual') {
      setFormInfoCap({ ...formInfoCap, tipoPuntoAgua: 4, otroCual: '' })
    } else {
      setFormInfoCap({ ...formInfoCap, tipoPuntoAgua: 5 })
    }
  }

  const changeText = (prop) => (event) => {
    setFormInfoCap({ ...formInfoCap, [prop]: event.target.value });
  };

  const changePuntoAgua = (name) => () => {
    if (name === 'nuevo') {
      setFormInfoCap({ ...formInfoCap, puntoAgua: 1 })
    } else {
      setFormInfoCap({ ...formInfoCap, puntoAgua: 2 })
    }
  }

  const changeNumber = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setFormInfoCap({ ...formInfoCap, [prop]: event.target.value, });
    } else {
      const t = Math.sign(event.target.value);
      if (!Number.isNaN(t)) {
        setFormInfoCap({ ...formInfoCap, [prop]: event.target.value });
      }
    }
  };

  const changeServidumbre = (name) => () => {
    if (name === 'si') {
      setFormInfoCap({ ...formInfoCap, servidumbre: 1 })
    } else {
      setFormInfoCap({ ...formInfoCap, servidumbre: 0 })
    }
  }

  const changeDate = (event) => {
    setFormInfoCap({ ...formInfoCap, fechaExpedicion: event });
  };

  const changeInforme = (name) => () => {
    if (name === 'si') {
      setFormInfoCap({ ...formInfoCap, anexaInfoExploracion: 1 })
    } else {
      setFormInfoCap({ ...formInfoCap, anexaInfoExploracion: 0 })
    }
  }

  // ------------------------------------------------------------------------
  const addCoordenada = (item) => async () =>{
    setArrayCoor(arrayCoor.concat(item))
    setCoordenada({
      tipc_lat_grad: '',
      tipc_lat_min: '',
      tipc_lat_seg: '',
      tipc_lon_grad: '',
      tipc_lon_min: '',
      tipc_lon_seg: '',
      tipc_alt: '',
    })
  }

  const deleteItem = (i) => () => {
    const newItem = [...arrayCoor];
    newItem.splice(i, 1)
    setArrayCoor(newItem);
  }

  const disabled =
    coordenada.tipc_lat_grad === '' ||
    coordenada.tipc_lat_min === '' ||
    coordenada.tipc_lat_seg === '' ||
    coordenada.tipc_lon_grad === '' ||
    coordenada.tipc_lon_min === '' ||
    coordenada.tipc_lon_seg === '' ||
    coordenada.tipc_alt === ''

  return (
    <div>
      <div className="p-16 sm:p-24 ">
        <div className="flex w-full mb-28" >
          <InfoPuntoCaptacion
            changeNumberCoor={changeNumberCoor}
            formInfoCap={formInfoCap}
            checkedPuntoAgua={checkedPuntoAgua}
            changeText={changeText}
            changePuntoAgua={changePuntoAgua}
            changeNumber={changeNumber}
            changeServidumbre={changeServidumbre}
            changeInforme={changeInforme}
            changeDate={changeDate}
            coordenada={coordenada}
            arrayCoor={arrayCoor}
            addCoordenada={addCoordenada}
            deleteItem={deleteItem}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
export default PuntoCaptacion;
