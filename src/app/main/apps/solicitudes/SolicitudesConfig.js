import { lazy } from 'react';

const SolicitudesConfig = {
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
          path: '/mis-solicitudes/listado-tramites',
          component: lazy(() => import('./listadoTramites')),
        },
        {
            path: '/mis-solicitudes/linea-tiempo/:id',
            component: lazy(() => import('./lineaTiempo')),
        },
        {
            path: '/mis-solicitudes/ver-solicitud/:id',
            component: lazy(() => import('./verSolicitud')),
        },
        {
            path: '/mis-solicitudes',
            component: lazy(() => import('./misSolicitudes')),
        },
        // {
        //     path: '/tramites-ambientales/tramite/22',
        //     component: lazy(() => import('./misSolicitudes')),
        // },
    ],
};

export default SolicitudesConfig;
