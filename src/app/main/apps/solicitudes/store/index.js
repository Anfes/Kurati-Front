import { combineReducers } from '@reduxjs/toolkit';
import tramites from './tramitesSlice';
import tramite from './tramiteSlice';
import corTolTramites from './CorTolTramitesSlice';

const reducer = combineReducers({
  tramites,
  tramite,
  corTolTramites
});

export default reducer;
