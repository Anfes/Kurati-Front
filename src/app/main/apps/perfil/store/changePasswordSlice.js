import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import FuseUtils from '@fuse/utils';
import axios from "axios";
import API from "app/services/constants/api";
import { showMessage } from "app/store/fuse/messageSlice";

export const updateChangePassword = (id, body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.users}/${API.endpoints.changePassword}/${id}`;
    const result = await axios.put(URL, body);
    if (result.status === 201) {
      dispatch(showMessage({ message: result.data.message, variant: 'info' }));
    } else {
      dispatch(showMessage({ message: '¡Contraseña cambiada con éxito!', variant: 'success' }));
      dispatch(setLoading())
    }
    return true
  } catch (err) {
    console.log("*** REDUX -> getById ***", err.response);
    await dispatch(showMessage({ message: `${err}`, variant: "error" }));
    return false;
  }
};

// export function cleanData() {
//   return (dispatch) => {
//       dispatch({
//           type: 'changePassword/newData',
//           payload: {}
//       })
//   }
// }

const customAdapter = createEntityAdapter({});

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState: customAdapter.getInitialState({
    page: 0,
    rowsPerPage: 20,
    totalRows: 0,
    sort: {
      orderBy: 'id',
      order: 'desc'
    },
    loading: false,
    data: {},
  }),
  reducers: {
    newData: {
      prepare: (event) => {
        const payload = {
          // ui: FuseUtils.generateGUID(),
          id: '',
          typeAction: 'new',
          password: '',
          newPassword: '',
          confirmPasword: '',
          showPassword: false,
          showNewPassword: false,
          showConfirmPassword: false,
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
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
  },
});

export const { newData, editData, setLoading } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
