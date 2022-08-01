import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import API from "app/services/constants/api";
import { showMessage } from "app/store/fuse/messageSlice";
import { setUserData } from 'app/auth/store/userSlice';

export const getById = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.official}/${API.endpoints.profile}/${id}`;
    const result = await axios.get(URL);
    const dataUpdate = {
      id: result.data.cu_id,
      documentType: result.data.cu_id_tipo_documento,
      documentNumber: result.data.cu_documento,
      name: result.data.cu_nombres,
      lastName: result.data.cu_apellidos,
      gender: result.data.cu_genero,
      phone: result.data.cu_celular.slice(2),
      email: result.data.cu_email,
      rol: result.data.cu_id_rol,
      // rol: {label:  result.data.fk_roles.rl_rol, value: result.data.fk_roles },

      personType: '',
    }
    await dispatch(editData(dataUpdate));
    return true;
  } catch (err) {
    console.log("*** REDUX -> getById ***", err.response);
    await dispatch(showMessage({ message: `${err}`, variant: "error" }));
    return false;
  }
};
export const updateProfile = (id, body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.official}/${API.endpoints.profile}/${id}`;
    const result = await axios.put(URL, body);
    if (result.status === 201) {
      dispatch(showMessage({ message: result.data.message, variant: 'info' }));
    } else {
      const dataUpdate = {
        id: result.data.cu_id,
        documentType: result.data.cu_id_tipo_documento,
        documentNumber: result.data.cu_documento,
        name: result.data.cu_nombres,
        lastName: result.data.cu_apellidos,
        gender: result.data.cu_genero,
        phone: result.data.cu_celular.slice(2),
        email: result.data.cu_email,
        rol: result.data.cu_id_rol,
        // rol: {label:  result.data.fk_roles.rl_rol, value: result.data.fk_roles },

        personType: '',
      }
      await dispatch(editData(dataUpdate));
      dispatch(showMessage({ message: '¡Los datos han sido actualizados!', variant: 'success' }));
    }
    return true
  } catch (err) {
    console.log("*** REDUX -> getById ***", err.response);
    await dispatch(showMessage({ message: `${err}`, variant: "error" }));
    return false;
  }
};

export const getCitizenById = (id) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.citizen}/${API.endpoints.profile}/${id}`;
    const result = await axios.get(URL);
    const dataUpdate = {
      id: result.data.us_id,
      personType: result.data.us_tipo_persona,
      documentType: result.data.us_id_tipo_documento,
      documentNumber: result.data.us_documento,
      name: result.data.us_nombres,
      lastName: result.data.us_apellidos,
      gender: result.data.us_genero,
      phone: result.data.us_celular.slice(2),
      email: result.data.us_email,
      empresa: result.data.us_empresa,

      rol: '',
    }
    await dispatch(editData(dataUpdate));
    return true;
  } catch (err) {
    console.log("*** REDUX -> getCitizenById ***", err.response);
    await dispatch(showMessage({ message: `${err}`, variant: "error" }));
    return false;
  }
};

export const updateCitizenProfile = (id, body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.citizen}/${API.endpoints.profile}/${id}`;
    const result = await axios.put(URL, body);
    if (result.status === 201) {
      dispatch(showMessage({ message: result.data.message, variant: 'info' }));
    } else {
      const dataUpdate = {
        id: result.data.us_id,
        personType: result.data.us_tipo_persona,
        documentType: result.data.us_id_tipo_documento,
        documentNumber: result.data.us_documento,
        name: result.data.us_nombres,
        lastName: result.data.us_apellidos,
        gender: result.data.us_genero,
        phone: result.data.us_celular.slice(2),
        email: result.data.us_email,
        empresa: result.data.us_empresa,

        rol: '',
      }
      await dispatch(editData(dataUpdate));
      dispatch(showMessage({ message: '¡Los datos han sido actualizados!', variant: 'success' }));
    }
    return true
  } catch (err) {
    console.log("*** REDUX -> getById ***", err.response);
    await dispatch(showMessage({ message: `${err}`, variant: "error" }));
    return false;
  }
};
export const changeProfilePhoto = (id, body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.users}/photo/${id}`;
    const result = await axios.put(URL, body);
    await dispatch(setUserData({ ...result.data, role: result.data.fk_roles.rl_rol }));
    return true
  } catch (err) {
    console.log("*** REDUX -> changeProfilePhoto ***", err.response);
    await dispatch(showMessage({ message: `${err}`, variant: "error" }));
    return false;
  }
};

export const getAllRoles = () => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.roles}/funcionario/list`
    const result = await axios.get(URL);
    await dispatch(rolesData(result.data.rows))
    return true
  } catch (err) {
    console.log('*** REDUX -> getAllStates ***', err.response)
    await dispatch(showMessage({ message: `${err}`, variant: 'error' }))
    return false
  }
};

const customAdapter = createEntityAdapter({});

const profileSlice = createSlice({
  name: "profile",
  initialState: customAdapter.getInitialState({
    page: 0,
    page: 0,
    rowsPerPage: 20,
    totalRows: 0,
    sort: {
      orderBy: 'id',
      order: 'desc'
    },
    loading: false,
    data: {},
    dataRoles: [],
  }),
  reducers: {
    newData: {
      prepare: (event) => {
        const payload = {
          // ui: FuseUtils.generateGUID(),
          id: '',
          personType: '',
          documentType: '',
          documentNumber: '',
          name: '',
          lastName: '',
          gender: '',
          phone: '',
          email: '',
          empresa: '',
          rol: '',
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.data = action.payload;
        // return { ...state, data: action.payload }
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
        state.data = action.payload;
      },
    },
    rolesData: {
      prepare: (event) => {
        const payload = event
        return { payload };
      },
      reducer: (state, action) => {
        state.dataRoles = action.payload;
      },
    },
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
  },
});

export const { newData, editData, rolesData, setLoading } = profileSlice.actions;

export default profileSlice.reducer;
