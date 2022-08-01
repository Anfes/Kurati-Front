import { useEffect, useState } from 'react';
import InfoAlerta from './anexos/InfoAlerta';
import Suit from './anexos/Suit';
import UnicoNac from './anexos/UnicoNac';

function Anexos(props) {
  const {
    formSol,
    listadoAnexosleft,
    listadoAnexosRight,
    fileArrayList,
    setFileArrayList,
    handleUploadChange,
    handleUploadDelete,
    statusAnexos,
    setDisabledAnexos,
    loadingAnexos,
  } = props;

  const [checkedTable, setCheckedTable] = useState();
  const [status, setStatus] = useState({
    documento: 0,
    sociedadesUnic: 0,
    jac: 0,
    poder: '',
    propietario: 0,
    tenedor: 0,
    poseedor: 0,
    censoUnic: '',
    concesionesEsp: '',
    autorizacionSan: '',
    sistemas: '',
    concesionRes: '',
    pueaa: '',
    cdcrdd: 0,
    anotacionesAd: '',
    diseñoPozo: '',
    censo: '',
    autSanitaria: '',
    detallesObra: '',
    adPredio: '',
    opLavado: '',
    adRefrigeracion: '',
    cantidadAgua: '',
    factibilidadEner: '',
    adEnergia: '',
    factibilidadIndustrial: '',
    factibilidadMinero: '',
  });

  console.log('fileArrayList', fileArrayList);

  const disabled =
    fileArrayList.documentos.length === 0 ||
    (fileArrayList.sociedadesUnic.length === 0 && fileArrayList.jac.length === 0) ||
    (fileArrayList.propietario.length === 0 &&
      fileArrayList.tenedor.length === 0 &&
      fileArrayList.poseedor.length === 0) ||
    fileArrayList.censoUnic.length === 0 ||
    fileArrayList.concesionesEsp.length === 0 ||
    fileArrayList.autorizacionSan.length === 0 ||
    fileArrayList.sistemas.length === 0 ||
    fileArrayList.concesionAgua.length === 0 ||
    fileArrayList.pueaa.length === 0 ||
    fileArrayList.cdcrdd.length === 0 ||
    fileArrayList.anotacionesAd.length === 0 ||
    fileArrayList.disenoPozo.length === 0 ||
    (checkedTable === 1
      ? fileArrayList.preCenso.length === 0 || fileArrayList.preAutoricacion.length === 0
      : false) ||
    (checkedTable === 2
      ? fileArrayList.refriAdicional.length === 0 || fileArrayList.refriDetalle.length === 0
      : false) ||
    (checkedTable === 3
      ? fileArrayList.energAnotacion.length === 0 ||
        fileArrayList.energCantidad.length === 0 ||
        fileArrayList.refriOperaciones.length === 0
      : false) ||
    (checkedTable === 4
      ? fileArrayList.completoFactibilidad.length === 0 ||
        fileArrayList.minerofactibilidad.length === 0
      : false) ||
    (checkedTable === 5 ? fileArrayList.industrialFactibilidad.length === 0 : false) ||
    (checkedTable === 6 ? fileArrayList.estudioFactibilidad.length === 0 : false);

  useEffect(() => {
    if (disabled) {
      setDisabledAnexos(true);
    } else {
      setDisabledAnexos(false);
    }
  }, [disabled, setDisabledAnexos]);

  const checkTable = (name) => async () => {
    if (name === 'acueductos') {
      if (checkedTable === 1) {
        setCheckedTable(0);
        setFileArrayList({ ...fileArrayList, preCenso: [], preAutoricacion: [] });
      } else {
        setCheckedTable(1);
      }
      // Para Acueductos de uso doméstico
    } else if (name === 'servicios') {
      if (checkedTable === 2) {
        setCheckedTable(0);
        setFileArrayList({ ...fileArrayList, refriAdicional: [], refriDetalle: [] });
      } else {
        setCheckedTable(2);
      }
      // Para prestación de servicios públicos
    } else if (name === 'refrigeracion') {
      if (checkedTable === 3) {
        setCheckedTable(0);
        setFileArrayList({
          ...fileArrayList,
          energAnotacion: [],
          energCantidad: [],
          refriOperaciones: [],
        });
      } else {
        setCheckedTable(3);
      }
      // Para refrigeración de máquinas
    } else if (name === 'energetico') {
      if (checkedTable === 4) {
        setCheckedTable(0);
        setFileArrayList({ ...fileArrayList, completoFactibilidad: [], minerofactibilidad: [] });
      } else {
        setCheckedTable(4);
      }
      // Para uso energético
    } else if (name === 'industrial') {
      if (checkedTable === 5) {
        setCheckedTable(0);
        setFileArrayList({ ...fileArrayList, industrialFactibilidad: [] });
      } else {
        setCheckedTable(5);
      }
      // Para uso industrial
    } else {
      if (checkedTable === 6) {
        setCheckedTable(0);
        setFileArrayList({ ...fileArrayList, estudioFactibilidad: [] });
      } else {
        setCheckedTable(6);
      }
      // Para uso minero y petrolero
    }
  };

  return (
    <div className="p-16 sm:p-24 ">
      <div className="flex w-full mb-28">
        <InfoAlerta statusAnexos={statusAnexos} />
      </div>
      <div className="md:flex-row flex-col flex ">
        <div className="flex md:w-1/2 md:mr-16 w-full mb-28">
          <UnicoNac
            listadoAnexosleft={listadoAnexosleft}
            handleUploadChange={handleUploadChange}
            fileArrayList={fileArrayList}
            handleUploadDelete={handleUploadDelete}
            status={status}
            loadingAnexos={loadingAnexos}
          />
        </div>
        <div className="flex md:w-1/2 md:ml-16 w-full mb-28">
          <Suit
            checkTable={checkTable}
            checkedTable={checkedTable}
            listadoAnexosRight={listadoAnexosRight}
            handleUploadChange={handleUploadChange}
            handleUploadDelete={handleUploadDelete}
            fileArrayList={fileArrayList}
            status={status}
            loadingAnexos={loadingAnexos}
          />
        </div>
      </div>
    </div>
  );
}
export default Anexos;
