import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'app/services/constants/api';
import { showMessage } from 'app/store/fuse/messageSlice';

export const sendForgotPass = (email) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.users}/forgot_password/${email}`
    const result = await axios.get(URL);
    return result
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};
export const confirmCodeUSer = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.users}/code_password`
    const result = await axios.post(URL, body);
    return result
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};
export const changePass = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.users}/reset_password`
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