import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'app/services/constants/api';
import { showMessage } from 'app/store/fuse/messageSlice';

export const addUserOrCompany = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.register_ciudadano}`
    const result = await axios.post(URL, body);
    if(result.status === 201){
      await dispatch(showMessage({ message:('ERROR: El celular ingresado ya existe en nuestras bases de datos. Verifique e intente de nuevo.'), variant: 'error' }));
    }else {
      await dispatch(showMessage({ message: 'Se ha enviado un mensaje a tu correo', variant: 'success' }));
    }
    return result.data
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};
export const sendCodeAgain = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.reenviar_codigo}`
    const result = await axios.post(URL, body);
    return result.data
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};
export const confirmCodeUSer = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.verificar_persona}`
    const result = await axios.post(URL, body);
    return result
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

const RegstroCiudadanoSlice = createSlice({
  name: 'regstroCiudadano',
  initialState: {
    dataTramite: {},
  },
  reducers: {
    setDataTramite: (state, action) => {
      state.dataTramite = action.payload;
    },
  },
});

export const { setDataTramite } = RegstroCiudadanoSlice.actions;

export default RegstroCiudadanoSlice.reducer;