import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/fuse/messageSlice';
import API from 'app/services/constants/api';

export const getById = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cities}/${id}`;
    const result = await axios.get(URL);
    const data = {
      id: result.data.cty_id,
      name: result.data.cty_name,
      code: result.data.cty_code,
      state: result.data.cty_state,
    }
    await dispatch(editData(data))
    return true
  } catch (err) {
    console.log('*** REDUX -> getById ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

export const saveData = (data) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cities}`;
    const body = {
      cty_name: data.name.toUpperCase(),
      cty_code: data.code || null,
      cty_state: data.state.toUpperCase(),
    }
    const result = await axios.post(URL, body);
    await dispatch(showMessage({ message: 'Registro guardado correctamente', variant: 'success' }))
    return true
  } catch (err) {
    console.log('*** REDUX -> saveData ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false

  }
};

export const updateData = (data, id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cities}/${id}`;
    const body = {
      cty_name: data.name.toUpperCase(),
      cty_code: data.code || null,
      cty_state: data.state.toUpperCase(),
    }
    const result = await axios.put(URL, body);
    await dispatch(showMessage({ message: 'Registro actualizo correctamente', variant: 'success' }))
    return true
  } catch (err) {
    console.log('*** REDUX -> updateData ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

const citySlice = createSlice({
  name: 'city',
  initialState: {
    page: 0,
    rowsPerPage: 20,
    totalRows: 0,
    sort: {
      orderBy: 'id',
      order: 'desc'
    },
    loading: false,
    dataCity: {},
  },
  reducers: {
    newData: {
      prepare: (event) => {
        const payload = {
          // id: FuseUtils.generateGUID(),
          typeAction: 'new',
          id: '',
          name: '',
          state: '',
          code: '',
        };
        return { payload };
      },
      reducer: (state, action) => {
        // state.customData = action.payload;
        return { ...state, data: action.payload }
      },
    },
    editData: {
      prepare: (event) => {
        const payload = {
          typeAction: 'edit',
          ...event,
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.dataCity = action.payload;
      },
    },
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
  },
});

export const { newData, editData, setLoading } = citySlice.actions;

export default citySlice.reducer;
