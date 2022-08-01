import { combineReducers } from '@reduxjs/toolkit';
import tramites from './tramitesSlice';
import corTolTramites from './CorTolTramitesSlice';

import gestionar from './gestionarSlice';
import solicitud from './SolicitudesSlice';

const reducer = combineReducers({
  tramites,
  corTolTramites,
  gestionar,
  solicitud,
});

export default reducer;
