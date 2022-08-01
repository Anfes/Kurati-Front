import { useMediaQuery } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useEffect, useState } from 'react';
import md5 from 'md5';
import { useDispatch } from 'react-redux';
import InfoPuntoCaptacion from './infoCaptacion/InfoPuntoCaptacion';

function PuntoCaptacion(props) {
  const {
    formInfoCap,
    setFormInfoCap,
    states,
    cities,
    arrayCoor,
    setArrayCoor,
    setDisabledCaptacion,
    informe,
    setInforme,
    dataInforme,
    setDataInforme,
  } = props;
  const dispatch = useDispatch();
  const mediumScreen = useMediaQuery('(min-width:900px)');
  const smallScreen = useMediaQuery('(min-width:600px)');

  const [coordenada, setCoordenada] = useState({
    tipc_lat_grad: '',
    tipc_lat_min: '',
    tipc_lat_seg: '',
    tipc_lon_grad: '',
    tipc_lon_min: '',
    tipc_lon_seg: '',
    tipc_alt: '',
  });

  const disabled =
    formInfoCap.tipoFuente === '' ||
    formInfoCap.nombreFuente === '' ||
    formInfoCap.verCor === '' ||
    formInfoCap.municipio === '' ||
    formInfoCap.departamento === '' ||
    formInfoCap.observaciones === '' ||
    arrayCoor.length === 0;

  useEffect(() => {
    if (disabled) {
      setDisabledCaptacion(true);
    } else {
      setDisabledCaptacion(false);
    }
  }, [disabled, setDisabledCaptacion]);

  useEffect(() => {
    if (formInfoCap.infoCoordenada.length > 0) {
      setArrayCoor(formInfoCap.infoCoordenada);
    } else {
      setArrayCoor([]);
    }
  }, [formInfoCap.infoCoordenada]);

  const departamentOptions = states
    ? states.map((resp) => ({
        value: resp.st_id,
        label: resp.st_name,
      }))
    : [];

  const municipalityOptions = cities
    ? cities.map((resp2) => ({
        value: resp2.cty_id,
        label: resp2.cty_name,
      }))
    : [];

  const checkedFuente = (name) => () => {
    if (name === 'lotico') {
      setFormInfoCap({ ...formInfoCap, tipoFuente: 1 });
      // 1: Lótico
    } else if (name === 'lentico') {
      setFormInfoCap({ ...formInfoCap, tipoFuente: 2 });
      // 2: Léntico
    } else if (name === 'lluvias') {
      setFormInfoCap({ ...formInfoCap, tipoFuente: 3 });
      // 3: Aguas lluvias
    } else if (name === 'minMed') {
      setFormInfoCap({ ...formInfoCap, tipoFuente: 4 });
      // 4: Minero - medicinales
    } else {
      setFormInfoCap({ ...formInfoCap, tipoFuente: 5 });
      // 5: Agua residual
    }
  };

  const changeServidumbre = (name) => () => {
    if (name === 'si') {
      setFormInfoCap({ ...formInfoCap, servidumbre: 1 });
      // 1:Si
    } else {
      setFormInfoCap({ ...formInfoCap, servidumbre: 0 });
      // 2: No
    }
  };

  const changeText = (prop) => (event) => {
    setFormInfoCap({ ...formInfoCap, [prop]: event.target.value });
  };

  const changeNumberCoor = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setCoordenada({ ...coordenada, [prop]: event.target.value });
    } else {
      const t = Math.sign(event.target.value);
      if (!Number.isNaN(t) || event.target.value == '-') {
        setCoordenada({ ...coordenada, [prop]: event.target.value });
      }
    }
  };

  const changeNumber = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setFormInfoCap({ ...formInfoCap, [prop]: event.target.value });
    } else {
      const t = Math.sign(event.target.value);
      if (!Number.isNaN(t)) {
        setFormInfoCap({ ...formInfoCap, [prop]: event.target.value });
      }
    }
  };

  const addCoordenada = (item) => async () => {
    setArrayCoor(arrayCoor.concat(item));
    setCoordenada({
      tipc_lat_grad: '',
      tipc_lat_min: '',
      tipc_lat_seg: '',
      tipc_lon_grad: '',
      tipc_lon_min: '',
      tipc_lon_seg: '',
      tipc_alt: '',
    });
  };

  const deleteItem = (i) => () => {
    const newItem = [...arrayCoor];
    newItem.splice(i, 1);
    setArrayCoor(newItem);
  };

  const changeFilterSelect = (prop) => (event) => {
    setFormInfoCap({ ...formInfoCap, [prop]: event });
  };

  const handleUploadChange = async (eventFile, id, name) => {
    const countArry = informe;
    if (countArry && countArry.length > 0) {
      await dispatch(
        showMessage({ message: `Puedes adjuntar hasta 1 archivos en este campo`, variant: 'error' })
      );
    } else {
      const file = eventFile[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = async () => {
        const type =
          file.type === 'application/pdf'
            ? 'pdf'
            : file.type ===
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ? 'docx'
            : file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ? 'xlsx'
            : file.type === 'image/png'
            ? 'png'
            : 'jpeg';

        const dataFile = {
          file,
          name_archivo: `${md5(Date.now())}.${type}`,
          url_base64: `data:${file.type};base64,${btoa(reader.result)}`,
        };
        // ----------------------------------------------------------------------
        setInforme(
          informe.concat(
            eventFile.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        );

        setDataInforme(dataFile);
        // ----------------------------------------------------------------------
      };
      reader.onerror = function (error) {
        console.log('error on load image', error);
      };
    }
  };
  const handleUploadDelete = (eventFile, i) => async () => {
    const array = [...informe];
    array.splice(i, 1);
    setInforme(array);
  };

  const disabledCoor =
    coordenada.tipc_lat_grad === '' ||
    coordenada.tipc_lat_min === '' ||
    coordenada.tipc_lat_seg === '' ||
    coordenada.tipc_lon_grad === '' ||
    coordenada.tipc_lon_min === '' ||
    coordenada.tipc_lon_seg === '' ||
    coordenada.tipc_alt === '';

  return (
    <div>
      <div className="p-16 sm:p-24 ">
        <div className="flex w-full mb-28">
          <InfoPuntoCaptacion
            arrayCoor={arrayCoor}
            coordenada={coordenada}
            changeNumber={changeNumber}
            addCoordenada={addCoordenada}
            deleteItem={deleteItem}
            disabled={disabledCoor}
            checkedFuente={checkedFuente}
            changeServidumbre={changeServidumbre}
            changeText={changeText}
            formInfoCap={formInfoCap}
            changeNumberCoor={changeNumberCoor}
            municipalityOptions={municipalityOptions}
            departamentOptions={departamentOptions}
            changeFilterSelect={changeFilterSelect}
            informe={informe}
            mediumScreen={mediumScreen}
            smallScreen={smallScreen}
            handleUploadChange={handleUploadChange}
            handleUploadDelete={handleUploadDelete}
          />
        </div>
      </div>
    </div>
  );
}
export default PuntoCaptacion;
