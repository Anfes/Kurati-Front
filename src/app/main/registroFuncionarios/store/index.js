import { combineReducers } from '@reduxjs/toolkit';
import registroFuncionario from './RegistroFuncionarioSlice';

const reducer = combineReducers({
  registroFuncionario
});

export default reducer;
