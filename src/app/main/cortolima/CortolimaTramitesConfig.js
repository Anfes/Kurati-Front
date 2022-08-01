import { authRoles } from 'app/auth';
import CortolimaTramites from './CortolimaTramites';

const CortolimaTramitesConfig = {
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
      path: '/cortolima-tramites',
      component: CortolimaTramites,
    },
  ],
};

export default CortolimaTramitesConfig;
