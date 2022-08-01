import { lazy } from 'react';
import { authRoles } from 'app/auth';

const PerfilConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/perfil-usuario',
            component: lazy(() => import('./PerfilApp')),
          },
    ],
};

export default PerfilConfig;
