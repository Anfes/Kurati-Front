import _ from "@lodash";
import withReducer from "app/store/withReducer";
import { useEffect, useState } from "react";

import InfoAlerta from "./anexos/InfoAlerta";
import Suit from "./anexos/Suit";
import UnicoNac from "./anexos/UnicoNac";

function Anexos(props) {
  const {
    formSol,
    listadoAnexosleft,
    listadoAnexosRight,
    fileArrayList,
    handleUploadChange,
    handleUploadDelete,
    loadingAnexos,
    setDisabledAnexos
  } = props;

  //--------------------------------------------------------------------------------
  const [checkedTable, setCheckedTable] = useState()

  // const disabled = fileArrayList.documentos.length === 0 ||
  //   (fileArrayList.sociedadesUnic.length === 0 && fileArrayList.jac.length === 0) ||
  //   (fileArrayList.propietario.length === 0 && fileArrayList.tenedor.length === 0 && fileArrayList.poseedor.length === 0) ||
  //   fileArrayList.censoUnic.length === 0 || fileArrayList.concesionesEsp.length === 0 || fileArrayList.autorizacionSan.length === 0 ||
  //   fileArrayList.sistemas.length === 0 || fileArrayList.permisoProsExp.length === 0 ||
  //   fileArrayList.modificacionAg.length === 0 || fileArrayList.pueaa.length === 0 ||

  //   fileArrayList.cdcrdd.length === 0 || fileArrayList.anotacionesAd.length === 0 || fileArrayList.disenoPozo.length === 0 ||
  //   (checkedTable === 1 ? fileArrayList.detallesObra.length === 0 || fileArrayList.adPredio.length === 0 : false) ||
  //   (checkedTable === 2 ? fileArrayList.opLavado.length === 0 || fileArrayList.adRefrigeracion.length === 0 || fileArrayList.cantidadAgua.length === 0 : false) ||
  //   (checkedTable === 3 ? fileArrayList.factibilidadEner.length === 0 || fileArrayList.adEnergia.length === 0 : false) ||
  //   (checkedTable === 4 ? fileArrayList.factibilidadIndustrial.length === 0 : false) ||
  //   (checkedTable === 5 ? fileArrayList.factibilidadMinero.length === 0 : false)

  // useEffect(() => {
  //   if (disabled) {
  //     setDisabledAnexos(true)
  //   } else {
  //     setDisabledAnexos(false)
  //   }
  // }, [disabled, setDisabledAnexos]);


  const checkTable = (name) => async () => {
   if (name === 'servicios') {
      if (checkedTable === 1) {
        setCheckedTable(0)
      } else {
        setCheckedTable(1)
      }
      //Para prestación de servicios públicos
    } else if (name === 'refrigeracion') {
      if (checkedTable === 2) {
        setCheckedTable(0)
      } else {
        setCheckedTable(2)
      }
      //Para refrigeración de máquinas
    } else if (name === 'energetico') {
      if (checkedTable === 3) {
        setCheckedTable(0)
      } else {
        setCheckedTable(3)
      }
      //Para uso energético
    } else if (name === 'industrial') {
      if (checkedTable === 4) {
        setCheckedTable(0)
      } else {
        setCheckedTable(4)
      }
      //Para uso industrial
    } else {
      if (checkedTable === 5) {
        setCheckedTable(0)
      } else {
        setCheckedTable(5)
      }
      //Para uso minero y petrolero
    }
  }

  return (

    <div className="p-16 sm:p-24 ">
      <div className="flex w-full mb-28" >
        <InfoAlerta />
      </div>
      <div className="md:flex-row flex-col flex ">
        <div className="flex md:w-1/2 md:mr-16 w-full mb-28" >
          <UnicoNac
            listadoAnexosleft={listadoAnexosleft}
            handleUploadChange={handleUploadChange}
            fileArrayList={fileArrayList}
            handleUploadDelete={handleUploadDelete}
            loadingAnexos={loadingAnexos}
          />
        </div>
        <div className="flex md:w-1/2 md:ml-16 w-full mb-28" >
          <Suit
            listadoAnexosRight={listadoAnexosRight}
            handleUploadChange={handleUploadChange}
            handleUploadDelete={handleUploadDelete}
            fileArrayList={fileArrayList}
            checkTable={checkTable}
            checkedTable={checkedTable}
            loadingAnexos={loadingAnexos}
          />
        </div>
      </div>
    </div>

  );
}
export default Anexos;
