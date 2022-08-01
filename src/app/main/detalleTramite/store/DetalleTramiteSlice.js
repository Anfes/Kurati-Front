import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'app/services/constants/api';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getProcedureById = (tt_id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.tramite}/no_auth/${tt_id}`
    const result = await axios.get(URL);
    await dispatch(setDataTramite(result.data))
    return true
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

const DetalleTramiteSlice = createSlice({
  name: 'detalleTramite',
  initialState: {
    dataTramite: {},
  },
  reducers: {
    setDataTramite: (state, action) => {
      state.dataTramite = action.payload;
    },
  },
});

export const { setDataTramite } = DetalleTramiteSlice.actions;

export default DetalleTramiteSlice.reducer;