import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import API from 'app/services/constants/api';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getAllProcedures = () => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.tramite}/categoria/1`
    const result = await axios.get(URL);
    await dispatch(setDataCorTolTramites(result.data.rows))
    return true
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

export const getProcedureBySubC = (tcsId) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.tramite}/subcategoria/${tcsId}`
    const result = await axios.get(URL);
    await dispatch(setDataTramiteSubCat(result.data.rows))
    return true
  } catch (err) {
    console.log('*** REDUX -> getAllTypeProcedure ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

export const getTramCategoriaSub = () => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.tram_categoria_sub}/categoria/1`
    const result = await axios.get(URL);
    await dispatch(setSubCategorias(result.data.rows))
    return true
  } catch (err) {
    console.log('*** REDUX -> getAllTypeProcedure ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

const CorTolTramitesSlice = createSlice({
  name: 'corTolTramites',
  initialState: {
    dataCorTolTramites: [],
    dataTramiteSubCat: [],
    subCategorias: [],
  },
  reducers: {
    setDataCorTolTramites: (state, action) => {
      state.dataCorTolTramites = action.payload;
    },
    setDataTramiteSubCat: (state, action) => {
      state.dataTramiteSubCat = action.payload;
    },
    setSubCategorias: (state, action) => {
      state.subCategorias = action.payload;
    },
  },
});

export const { setDataCorTolTramites, setDataTramiteSubCat, setSubCategorias } = CorTolTramitesSlice.actions;

export default CorTolTramitesSlice.reducer;