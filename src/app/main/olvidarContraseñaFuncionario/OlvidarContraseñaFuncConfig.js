import { authRoles } from 'app/auth';
import OlvidarContraseña from './OlvidarContraseña';

const OlvidarContraseñaFuncConfig = {
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
          display: false,
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
      path: '/olvidar-contrasena-funcionario',
      component: OlvidarContraseña,
    },
  ],
};

export default OlvidarContraseñaFuncConfig;
