import { authRoles } from 'app/auth';
import TiposTramites from './TiposTramites';

const TiposTramitesConfig = {
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
      path: '/tipos-tramites',
      component: TiposTramites,
    },
  ],
};

export default TiposTramitesConfig;
