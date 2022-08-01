import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import API from 'app/services/constants/api';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getConfirm = (token) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.validar_email}/${token}`
    const result = await axios.get(URL);
    await dispatch(setResultVerificar(result.data))
    return result.data
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: err.response.data.message, variant: err.response.data.status }))
    return false
  }
};

const ConfirmarEmailSlice = createSlice({
  name: 'confirmarEmail',
  initialState: {
    resultVerificar: {},
  },
  reducers: {
    setResultVerificar: (state, action) => {
      state.resultVerificar = action.payload;
    }
  },
});

export const { setResultVerificar } = ConfirmarEmailSlice.actions;

export default ConfirmarEmailSlice.reducer;