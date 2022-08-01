// import Tramite1Config from './tramite1/Tramite1Config';
import { lazy } from 'react';

const TramitesAmbientalesConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: '/tramites-ambientales/1/:solId',
      component: lazy(() => import('./tramite1/Tramite1')),
      
    },
    {
      path: '/tramites-ambientales/3/:solId',
      component: lazy(() => import('./tramite3/Tramite3')),

    },
    {
      path: '/tramites-ambientales/7/:solId',
      component: lazy(() => import('./tramite7/Tramite7')),

    },

  ],
}

export default TramitesAmbientalesConfig;