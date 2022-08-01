import { authRoles } from 'app/auth';
import Tramite from './Tramite';

const TramiteConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: true,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/detalle-tramite/:id',
      component: Tramite,
    },
  ],
};

export default TramiteConfig;
