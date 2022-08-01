import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import API from 'app/services/constants/api';

export const getListSolicitud = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud}/${API.endpoints.official}/${id}`;
    const result = await axios.get(URL);
    return await dispatch(setListSolicitud(result?.data?.rows));
  } catch (err) {
    console.log('*** REDUX -> getListSolicitud ***', err.response);
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }));
    return false;
  }
};

const solicitudSlice = createSlice({
  name: 'solicitud',
  initialState: {
    listSolicitud: [],
  },
  reducers: {
    setListSolicitud: (state, action) => {
      state.listSolicitud = action.payload;
    },
  },
});

export const { setListSolicitud } = solicitudSlice.actions;

export default solicitudSlice.reducer;
