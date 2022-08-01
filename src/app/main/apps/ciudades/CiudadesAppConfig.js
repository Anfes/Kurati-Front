import { lazy } from 'react';

const CiudadesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/ciudad/:cityId/:item?',
      component: lazy(() => import('./ciudad/CiudadApp')),
    },
    {
      path: '/ciudades',
      component: lazy(() => import('./ciudadesApp/Ciudades')),
    },
  ],
};

export default CiudadesConfig;
