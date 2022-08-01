import _ from "@lodash";
import { Typography, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import NumeroTel from "./firma/NumeroTel";
import Validacion from "./firma/Validacion";

function Firma(props) {
  const {
    formFirma,
    setFormFirma,
    setDisabledFirma
  } = props;
  const smallScreen = useMediaQuery('(min-width:850px)')

  const disabled = formFirma.telefono === '' ||
    formFirma.codigo === ''

  useEffect(() => {
    if (disabled) {
      setDisabledFirma(true)
    } else {
      setDisabledFirma(false)
    }
  }, [disabled, setDisabledFirma]);

  const changeNumber = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setFormFirma({ ...formFirma, [prop]: event.target.value, });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setFormFirma({ ...formFirma, [prop]: t.toString() });
      } else {
        setFormFirma({ ...formFirma, [prop]: "" });
      }
    }
  };

  return (
    <div className="p-16 sm:p-24 flex flex-col">
      <Typography className='font-bold text-14 mb-16' style={{ color: '#4C647A' }}>Firma del solicitante o apoderado debidamente constituido</Typography>
      <div className={smallScreen ? "flex" : 'flex flex-col'}>
        <div className={smallScreen ? "flex w-3/5 mr-16 mb-28" : "flex w-full mb-28"} >
          <NumeroTel
            changeNumber={changeNumber}
            formFirma={formFirma}
          />
        </div>
        <div className={smallScreen ? "flex w-2/5 ml-16 mb-28" : '"flex w-full mb-28"'} >
          <Validacion
            setFormFirma={setFormFirma}
            formFirma={formFirma}
          />
        </div>
      </div>
    </div>

  );
}
export default Firma;
