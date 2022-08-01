import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from 'app/services/constants/api';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getRequestByUser = (id, page, rowsPerPage, orderBy, order, params) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.solicitud}/lista_ciudadano/${id}?page=${page}&rows=${rowsPerPage}&order_field=${orderBy}&filters=${JSON.stringify(params)}&order_type=${order}`
    const result = await axios.get(URL);
    await dispatch(setDataTramites(result.data.rows))
    await dispatch(setTotalRows(result.data.count))
    return true
  } catch (err) {
    console.log('*** REDUX -> getAll ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

export const deleteData = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cities}/${id}`;
    const result = await axios.delete(URL);
    await dispatch(showMessage({ message: 'Registro elimino correctamente', variant: 'success' }))
    return true
  } catch (err) {
    console.log('*** REDUX -> deleteData ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

const tramitesSlice = createSlice({
  name: 'tramites',
  initialState: {
    dataTramites: [],
    page: 0,
    rowsPerPage: 25,
    totalRows: 0,
    loading: false,
  },
  reducers: {
    setDataTramites: (state, action) => {
      state.dataTramites = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalRows: (state, action) => {
      state.totalRows = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
  },
});

export const { setDataTramites, setRowsPerPage, setPage, setTotalRows, setLoading } = tramitesSlice.actions;

export default tramitesSlice.reducer;
