import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'app/services/constants/api';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getDocumentType = () => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.tipos_documento}/list`;
    const result = await axios.get(URL);
    await dispatch(setDataTipoDocumento(result.data.rows));
    return true;
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const getStates = () => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.state}/list`;
    const result = await axios.get(URL);
    await dispatch(setDataStates(result.data.rows));
    return true;
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const getCities = () => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cities}`;
    const result = await axios.get(URL);
    await dispatch(setDataCities(result.data.rows));
    return true;
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const getCitiesByState = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cities}/by_state/${id}`;
    const result = await axios.get(URL);
    await dispatch(setDataCities(result.data));
    return true;
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};
export const getSolicitudById = (tramId, id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud}/${tramId}/${id}`;
    const result = await axios.get(URL);
    if (result) {
      if (result.status === 200) {
        const solicitud = result.data;
        const data = {
          solicitudId: solicitud.ss_id,
          tramiteName: solicitud.fk_tra_tramite.tt_nombre,
          solicitudEtapa: solicitud.fk_sol_etapa.se_etapa,
          solicitudEstado: solicitud.fk_sol_estado.ses_estado,
          pasoActual: solicitud.ss_paso_actual,
        };
        await dispatch(setSolicitud(data));
      } else {
        await dispatch(setRedirect());
        dispatch(showMessage({ message: `${result.data.message}`, variant: 'error' }));
      }
    }
  } catch (err) {
    console.log('*** REDUX -> getSolicitud ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const cambiarPasoSolicitud = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud}/paso`;
    const result = await axios.post(URL, body);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> saveDataSolicitante ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const documentacionAnexos = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.documentacion_anexos}/${id}`;
    const result = await axios.get(URL);
    await dispatch(setDocumentoAnexos(result.data));
    return true;
  } catch (err) {
    console.log('*** REDUX -> documentacionAnexos ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};
//---------------------------------------------------------------------------------------------
export const getSolicitante = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/datos_solicitante/${id}`;
    const result = await axios.get(URL);
    const solicitud = result.data;
    const data = {
      personType: solicitud.tds_tipo_persona,
      personType2: solicitud.tds_jur_tipo,
      businessName: solicitud.tds_nombre_o_razon_social,
      documentType: solicitud.fk_tipo_documento.tsd_id,
      documentNumber: solicitud.tds_nro_doc,
      address: solicitud.tds_direccion,
      city: { value: solicitud.fk_ciudad.cty_id, label: solicitud.fk_ciudad.cty_name },
      phone: solicitud.tds_telefonos,
      email: solicitud.tds_email,
      fax: solicitud.tds_fax,
      autNot: solicitud.tds_autoriza_notif_email,
      addressNot: solicitud.tds_direccion_notif_fisica,
      calAct: solicitud.tds_en_calidad,
      repOrApo: solicitud.tds_reapo_tipo,
      nameRep: solicitud.tds_repapo_nombre,
      documentTypeRep: solicitud.tds_repapo_id_tipo_doc,
      documentNumberRep: solicitud.tds_repapo_nro_doc,
      expeditionPlaceRep: {
        value: solicitud.fk_repapo_ciudad_expedicion.cty_id,
        label: solicitud.fk_repapo_ciudad_expedicion.cty_name,
      },
      addressRep: solicitud.tds_repapo_direccion,
      cityRep: {
        value: solicitud.fk_repapo_ciudad.cty_id,
        label: solicitud.fk_repapo_ciudad.cty_name,
      },
      phoneRep: solicitud.tds_repapo_telefonos,
      emailRep: solicitud.tds_repapo_email,
      faxRep: solicitud.tds_repapo_fax,
    };
    await dispatch(setDataSolicitante(data));
    return true;
  } catch (err) {
    console.log('*** REDUX -> getSolicitante ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const saveDataSolicitante = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/datos_solicitante`;
    const result = await axios.post(URL, body);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return result.data;
  } catch (err) {
    console.log('*** REDUX -> saveData ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const updateDataSolicitante = (body, solId) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/datos_solicitante/${solId}`;
    const result = await axios.put(URL, body);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> updateDataSolicitante ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

//------------------------------------------------------------------------------------------------
export const getInfoGeneral = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/informacion_general/${id}`;
    const result = await axios.get(URL);
    if (!_.isEmpty(result.data)) {
      const solicitud = result.data;
      const data = {
        municipio: { value: solicitud.fk_cities.cty_id, label: solicitud.fk_cities.cty_name },
        departamento: {
          value: solicitud.fk_cities.fk_states.st_id,
          label: solicitud.fk_cities.fk_states.st_name,
        },
        nombrePredio: solicitud.tig_nombre,
        direccion: solicitud.tig_direccion,
        vereCorre: solicitud.tig_vereda_corregimiento,
        actividad: solicitud.tig_actividad,
        costoPro: solicitud.tig_costo_proyecto,
        costoProLet: solicitud.tig_valor_letras,
        ciiu: solicitud.tig_codigo_ciiu,
      };
      await dispatch(setDataInfoGeneral(data));
    } else {
      await dispatch(setDataInfoGeneral({}));
    }
    return true;
  } catch (err) {
    console.log('*** REDUX -> getInfoGeneral ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const saveDataInfoGeneral = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/informacion_general`;
    const result = await axios.post(URL, body);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> saveDataInfoGeneral ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const updateDataInfoGeneral = (body, solId) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/informacion_general/${solId}`;
    const result = await axios.put(URL, body);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> updateDataInfoGeneral ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};
//--------------------------------------------------------------------------------------------------

export const getPuntoCaptacion = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/info_punto_captacion/${id}`;
    const result = await axios.get(URL);
    if (!_.isEmpty(result.data)) {
      const solicitud = result.data;
      const data = {
        tipoFuente: solicitud.tip_tipo_fuente,
        nombreFuente: solicitud.tip_nombre,
        verCor: solicitud.tip_pobvercorr,
        municipio: solicitud.tip_id_ciudad_pobvercorr,
        infoCoordenada: solicitud.tip_coordenadas,
        servidumbre: solicitud.tip_requiere_servidumbre,
        observaciones: solicitud.tip_observaciones,
        informe: solicitud.tip_croquis,
      };
      await dispatch(setDataPuntoCaptacion(data));
    } else {
      await dispatch(setDataPuntoCaptacion({}));
    }
    return true;
  } catch (err) {
    console.log('*** REDUX -> getPuntoCaptacion ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const saveDataPuntoCaptacion = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/info_punto_captacion`;
    const result = await axios.post(URL, body);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> saveDataPuntoCaptacion ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const updateDataPuntoCaptacion = (body, solId) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/info_punto_captacion/${solId}`;
    const result = await axios.put(URL, body);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> updateDataPuntoCaptacion ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};
//--------------------------------------------------------------------------------------------------

export const getDemandaUso = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/demanda_uso/${id}`;
    const result = await axios.get(URL);
    if (!_.isEmpty(result.data)) {
      const solicitud = result.data;
      const data = {
        tipoActividad: solicitud.tdu_otrofin_tipo_actividad,
        descripcionFinUso: solicitud.tdu_descripcion_otrouso,
        cantidadAgua: solicitud.tdu_cantidad_agua_solicitada,
        tiempoConcesion: solicitud.tdu_termino,
        mesAno: solicitud.tdu_mes_ano,
        tipoAnexo: solicitud.tdu_pueaa_tipo,
        infoAbastecimientoDomestico: solicitud.tdu_abastecimiento_domestico,
        infoRiegosSilvicultura: solicitud.tdu_riegos_silvicultura,
        infoAgriculturaPesca: solicitud.tdu_agricultura_pesca,
        infoAbastecimientoAbrevaderos: solicitud.tdu_abastecimiento_abrevaderos,
      };
      await dispatch(setDataDemandaUso(data));
    } else {
      await dispatch(setDataDemandaUso({}));
    }
    return true;
  } catch (err) {
    console.log('*** REDUX -> getDemandaUso ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const saveDataDemandaUso = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/demanda_uso`;
    const payload = {
      ...body,
      tdu_otrofin_tipo_actividad: body.tipoActividad,
      tdu_descripcion_otrouso: body.descripcionFinUso,
      tdu_cantidad_agua_solicitada: body.cantidadAgua,
      tdu_termino: body.tiempoConcesion,
      tdu_mes_ano: body.mesAno,
      tdu_pueaa_tipo: body.tipoAnexo,
    };
    const result = await axios.post(URL, payload);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> saveDataDemandaUso ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const updateDataDemandaUso = (body, solId) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/demanda_uso/${solId}`;
    const payload = {
      ...body,
      tdu_otrofin_tipo_actividad: body.tipoActividad,
      tdu_descripcion_otrouso: body.descripcionFinUso,
      tdu_cantidad_agua_solicitada: body.cantidadAgua,
      tdu_termino: body.tiempoConcesion,
      tdu_mes_ano: body.mesAno,
      tdu_pueaa_tipo: body.tipoAnexo,
    };
    delete payload.infoAbastecimientoDomestico;
    delete payload.infoRiegosSilvicultura;
    delete payload.infoAgriculturaPesca;
    delete payload.infoAbastecimientoAbrevaderos;

    const result = await axios.put(URL, payload);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> updateDataDemandaUso ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};
//--------------------------------------------------------------------------------------------------

export const getFileAnexos = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/anexos_doc/${id}`;
    const result = await axios.get(URL);
    if (!_.isEmpty(result.data)) {
      const solicitud = result.data;
      const data = {
        documentos: solicitud.documentos,
        sociedadesUnic: solicitud.sociedadesUnic,
        jac: solicitud.jac,
        poder: solicitud.poder,
        propietario: solicitud.propietario,
        tenedor: solicitud.tenedor,
        poseedor: solicitud.poseedor,
        censoUnic: solicitud.censoUnic,
        concesionesEsp: solicitud.concesionesEsp,
        autorizacionSan: solicitud.autorizacionSan,
        sistemas: solicitud.sistemas,
        concesionAgua: solicitud.concesionAgua,
        pueaa: solicitud.pueaa,
        documentoAdd: solicitud.documentoAdd,
        documentoAddReq: solicitud.documentoAddReq,

        cdcrdd: solicitud.cdcrdd,
        anotacionesAd: solicitud.anotacionesAd,
        disenoPozo: solicitud.disenoPozo,
        preCenso: solicitud.preCenso,
        preAutoricacion: solicitud.preAutoricacion,
        refriDetalle: solicitud.refriDetalle,
        refriAdicional: solicitud.refriAdicional,
        refriOperaciones: solicitud.refriOperaciones,
        completoFactibilidad: solicitud.completoFactibilidad,
        energAnotacion: solicitud.energAnotacion,
        energCantidad: solicitud.energCantidad,
        industrialFactibilidad: solicitud.industrialFactibilidad,
        minerofactibilidad: solicitud.minerofactibilidad,
        estudioFactibilidad: solicitud.estudioFactibilidad,
      };
      await dispatch(setDataAnexoArchivo(data));
    } else {
      await dispatch(setDataAnexoArchivo({}));
    }
    return true;
  } catch (err) {
    console.log('*** REDUX -> getFileAnexos ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const createFileAnexo = (payload) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/anexos_doc`;
    const result = await axios.post(URL, payload);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> createFileAnexo ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const deleteFileAnexo = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/anexos_doc/${id}`;
    const result = await axios.delete(URL);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> deleteFileAnexo ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const updateAnexo = (body, solId) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud_three}/anexos/${solId}`;
    const result = await axios.put(URL, body);
    await dispatch(showMessage({ message: 'Exito', variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> updateAnexo ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};
//--------------------------------------------------------------------------------------------------

export const cleanRedux = () => async (dispatch) => {
  dispatch(setSolicitud({}));
  dispatch(setDataSolicitante({}));
  dispatch(setDataInfoGeneral({}));
  dispatch(setDataPuntoCaptacion({}));
  dispatch(setDataDemandaUso({}));
  dispatch(setDataAnexoArchivo({}));
};

const solicitanteSlice = createSlice({
  name: 'solTramiteThree',
  initialState: {
    loading: false,
    redirect: false,
    documentoAnexos: [],
    dataTipoDocumento: [],
    dataCities: [],
    dataStates: [],
    solicitud: {},
    dataSolicitante: {},
    dataInfoGeneral: {},
    dataPuntoCaptacion: {},
    dataDemandaUso: {},
    dataAnexoArchivo: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
    setRedirect: (state, action) => {
      state.redirect = !state.redirect;
    },
    setDocumentoAnexos: (state, action) => {
      state.documentoAnexos = action.payload;
    },
    setDataTipoDocumento: (state, action) => {
      state.dataTipoDocumento = action.payload;
    },
    setDataCities: (state, action) => {
      state.dataCities = action.payload;
    },
    setDataStates: (state, action) => {
      state.dataStates = action.payload;
    },
    setSolicitud: (state, action) => {
      state.solicitud = action.payload;
    },
    setDataSolicitante: (state, action) => {
      state.dataSolicitante = action.payload;
    },
    setDataInfoGeneral: (state, action) => {
      state.dataInfoGeneral = action.payload;
    },
    setDataPuntoCaptacion: (state, action) => {
      state.dataPuntoCaptacion = action.payload;
    },
    setDataDemandaUso: (state, action) => {
      state.dataDemandaUso = action.payload;
    },
    setDataAnexoArchivo: (state, action) => {
      state.dataAnexoArchivo = action.payload;
    },
  },
});

export const {
  setLoading,
  setRedirect,
  setDocumentoAnexos,
  setDataTipoDocumento,
  setDataCities,
  setDataStates,
  setSolicitud,
  setDataSolicitante,
  setDataInfoGeneral,
  setDataPuntoCaptacion,
  setDataDemandaUso,
  setDataAnexoArchivo,
} = solicitanteSlice.actions;

export default solicitanteSlice.reducer;
