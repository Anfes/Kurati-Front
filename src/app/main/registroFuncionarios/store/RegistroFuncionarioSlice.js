import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'app/services/constants/api';
import { showMessage } from 'app/store/fuse/messageSlice';

export const addofficer = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.register_funcionario}`
    const result = await axios.post(URL, body);
    return result.data
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

export const getAllRoles = () => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.roles}/funcionario/list`
    const result = await axios.get(URL);
    await dispatch(setDataRoles(result.data.rows))
    return true
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

const RegistroFuncionarioSlice = createSlice({
  name: 'registroFuncionario',
  initialState: {
    dataRoles: [],
  },
  reducers: {
    setDataRoles: (state, action) => {
      state.dataRoles = action.payload;
    },
  },
});

export const { setDataRoles } = RegistroFuncionarioSlice.actions;

export default RegistroFuncionarioSlice.reducer;