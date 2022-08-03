import { combineReducers } from '@reduxjs/toolkit';
import tiposTramites from './TiposTramitesSlice';

const reducer = combineReducers({
  tiposTramites
});

export default reducer;
