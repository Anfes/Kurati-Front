import { authRoles } from 'app/auth';
import Register from './Register';

const RegistroFuncionariosConfig = {
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
      path: '/registro-funcionario',
      component: Register,
    },
  ],
};

export default RegistroFuncionariosConfig;
