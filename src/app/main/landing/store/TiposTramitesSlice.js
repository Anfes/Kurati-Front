import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'app/services/constants/api';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getAllStates = () => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.state}/list`
    const result = await axios.get(URL);
    await dispatch(setDataStates(result.data.rows))
    return true
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

export const getAllTypeProcedure = () => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.procedure}/list`
    const result = await axios.get(URL);
    await dispatch(setDataTypeProcedure(result.data.rows))
    return true
  } catch (err) {
    console.log('*** REDUX -> getAllTypeProcedure ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

const TiposTramitesSlice = createSlice({
  name: 'tiposTramites',
  initialState: {
    dataStates: [],
    dataTypeProcedure: [],
  },
  reducers: {
    setDataStates: (state, action) => {
      state.dataStates = action.payload;
    },
    setDataTypeProcedure: (state, action) => {
      state.dataTypeProcedure = action.payload;
    },
  },
});

export const { setDataStates, setDataTypeProcedure } = TiposTramitesSlice.actions;

export default TiposTramitesSlice.reducer;