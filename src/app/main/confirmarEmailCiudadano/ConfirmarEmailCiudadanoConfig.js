import { authRoles } from 'app/auth';
import ConfirmarEmail from './ConfirmarEmail';

const ConfirmarEmailCiudadanoConfig = {
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
      path: '/verificar-email-ciudadano/:token',
      component: ConfirmarEmail,
    },
  ],
};

export default ConfirmarEmailCiudadanoConfig;
