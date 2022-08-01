import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import md5 from 'md5';
import { showMessage } from 'app/store/fuse/messageSlice';
import API from 'app/services/constants/api';
import { uploadFile } from 'app/utils/uploadFile';

export const getSolicitudEtapaUno = (ssId) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.etapa}/${ssId}`;
    const result = await axios.get(URL);
    return await dispatch(setDataTram(result.data));
  } catch (err) {
    console.log('*** REDUX -> getSolicitudEtapaUno ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const getArchivoPasoUno = (idSolicitud) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.etapa_uno}/${idSolicitud}`;
    const result = await axios.get(URL);
    return await dispatch(setPasoUno(result.data));
  } catch (err) {
    console.log('*** REDUX -> getArchivoPasoUno ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const createArchivoPasoUno = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.etapa_uno}`;
    const result = await axios.post(URL, body);
    console.log('result.data', result.data);
    await dispatch(
      showMessage({
        message: result.data.message ? `${result.data.message}` : '¡Creado con exito!',
        variant: 'success',
      })
    );
    return true;
  } catch (err) {
    console.log('*** REDUX -> createArchivoPasoUno ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const updateArchivoPasoUno = (idSolicitud, idTramite, body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.etapa_uno}/${idSolicitud}/${idTramite}`;
    const result = await axios.put(URL, body);
    await dispatch(showMessage({ message: `${result.data.message}`, variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> updateArchivoPasoUno ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const createDevolverPasoUno = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.etapa_uno_devolver}`;
    const result = await axios.post(URL, body);
    await dispatch(showMessage({ message: `${result.data.message}`, variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> createDevolverPasoUno ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const createAprobarPasoUno = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.etapa_uno_aprobar}`;
    const result = await axios.post(URL, body);
    await dispatch(showMessage({ message: `${result.data.message}`, variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> createAprobarPasoUno ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const createValidarPasoDos = (body) => async (dispatch) => {
  try {
    let newFileName = [];
    body.arrayFile.map(async (t) => {
      const type =
        t.type === 'application/pdf'
          ? 'pdf'
          : t.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ? 'docx'
          : t.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ? 'xlsx'
          : t.type === 'image/png'
          ? 'png'
          : 'jpeg';
      const dataSend = {
        name_archivo: `${md5(Date.now())}.${type}`,
        file: t,
      };
      newFileName = newFileName.concat({ archivo: dataSend.name_archivo });
      const result = await uploadFile(
        `${body.userCreator}/${body.sca_id_solicitud}/solicitud`,
        dataSend
      );
    });
    const payload = {
      sca_id_solicitud: body.sca_id_solicitud,
      sca_concepto_agua: body.sca_concepto_agua,
      sca_concepto_suelo: body.sca_concepto_suelo,
      sca_tipo: 1,
      sca_estado: body.sca_estado,
      scs_archivo: newFileName,
    };
    const URL = `${API.baseUrl}/${API.endpoints.etapa_dos_concepto}`;
    const result = await axios.post(URL, payload);
    await dispatch(showMessage({ message: `${result.data.message}`, variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> createValidarPasoDos ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const createValidarPasoTres = (body) => async (dispatch) => {
  try {
    let newFileNameOne = [];
    let newFileNameTwo = [];
    let nameOne = '';
    let nameTwo = '';
    body.sl_liquidacion.map(async (t) => {
      const type =
        t.type === 'application/pdf'
          ? 'pdf'
          : t.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ? 'docx'
          : t.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ? 'xlsx'
          : t.type === 'image/png'
          ? 'png'
          : 'jpeg';
      const dataSend = {
        name_archivo: `${md5(Date.now())}.${type}`,
        file: t,
      };
      nameOne = dataSend.name_archivo;
      newFileNameOne = newFileNameOne.concat({ archivo: dataSend.name_archivo });
      const result = await uploadFile(
        `${body.userCreator}/${body.sl_id_solicitud}/solicitud`,
        dataSend
      );
    });
    body.sl_recibo.map(async (t) => {
      const type =
        t.type === 'application/pdf'
          ? 'pdf'
          : t.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ? 'docx'
          : t.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ? 'xlsx'
          : t.type === 'image/png'
          ? 'png'
          : 'jpeg';
      const dataSend = {
        name_archivo: `${md5(Date.now())}.${type}`,
        file: t,
      };
      nameTwo = dataSend.name_archivo;
      newFileNameTwo = newFileNameTwo.concat({ archivo: dataSend.name_archivo });
      const result = await uploadFile(
        `${body.userCreator}/${body.sl_id_solicitud}/solicitud`,
        dataSend
      );
    });
    const payload = {
      sl_id_solicitud: body.sl_id_solicitud,
      sl_liquidacion: nameOne,
      sl_recibo: nameTwo,
      sl_observacion: body.sl_observacion,
    };
    const URL = `${API.baseUrl}/${API.endpoints.etapa_tres_liquidacion}`;
    const result = await axios.post(URL, payload);
    await dispatch(showMessage({ message: `${result.data.message}`, variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> createValidarPasoTres ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

export const createValidarPasoCuatro = (body) => async (dispatch) => {
  console.log('bodybody', body)
  try {
    let newFileNameOne = [];
    let nameOne = '';
    body.sp_soporte_pago.map(async (t) => {
      const type =
        t.type === 'application/pdf'
          ? 'pdf'
          : t.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ? 'docx'
          : t.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ? 'xlsx'
          : t.type === 'image/png'
          ? 'png'
          : 'jpeg';
      const dataSend = {
        name_archivo: `${md5(Date.now())}.${type}`,
        file: t,
      };
      nameOne = dataSend.name_archivo;
      newFileNameOne = newFileNameOne.concat({ archivo: dataSend.name_archivo });
      const result = await uploadFile(
        `${body.userCreator}/${body.sl_id_solicitud}/solicitud`,
        dataSend
      );
    });
    const payload = {
      sp_id_solicitud: body.sp_id_solicitud,
      sp_soporte_pago: nameOne,
      sp_observacion: body.sp_observacion,
    };
    const URL = `${API.baseUrl}/${API.endpoints.etapa_cuatro_pago}`;
    const result = await axios.post(URL, payload);
    await dispatch(showMessage({ message: `${result.data.message}`, variant: 'success' }));
    return true;
  } catch (err) {
    console.log('*** REDUX -> createValidarPasoCuatro ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

const gestionarSlice = createSlice({
  name: 'gestionar',
  initialState: {
    dataTram: [],
    pasoUno: [],
    bodyItemPasoUno: {},
  },
  reducers: {
    setDataTram: (state, action) => {
      state.dataTram = action.payload;
    },
    setPasoUno: (state, action) => {
      state.pasoUno = action.payload;
    },
  },
});

export const { setDataTram, setPasoUno } = gestionarSlice.actions;

export default gestionarSlice.reducer;
