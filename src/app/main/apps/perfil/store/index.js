import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import changePassword from './changePasswordSlice';

const reducer = combineReducers({
  profile,
  changePassword

});

export default reducer;
