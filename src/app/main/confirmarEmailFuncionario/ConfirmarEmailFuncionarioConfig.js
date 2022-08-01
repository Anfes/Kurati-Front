import { authRoles } from 'app/auth';
import ConfirmarEmail from './ConfirmarEmail';

const ConfirmarEmailFuncionarioConfig = {
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
      path: '/verificar-email-funcionario/:token',
      component: ConfirmarEmail,
    },
  ],
};

export default ConfirmarEmailFuncionarioConfig;
