import { lazy } from 'react';

const SolicitudesFuncionarioConfig = {
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
            path: '/solicitudes/expediente/:id',
            component: lazy(() => import('./expediente')),
        },
        {
            path: '/solicitudes/gestionar-tarea/:id',
            component: lazy(() => import('./gestionarTarea')),
        },
        {
            path: '/solicitudes/evaluacion-tarea/:id',
            component: lazy(() => import('./evaluacion/Evaluacion')),
        },
        {
            path: '/solicitudes/crear-expediente/:id',
            component: lazy(() => import('./evaluacion/expediente/Expediente')),
        },
        {
            path: '/solicitudes',
            component: lazy(() => import('./solicitudes')),
        },
        // {
        //     path: '/tramites-ambientales/tramite/22',
        //     component: lazy(() => import('./misSolicitudes')),
        // },
    ],
};

export default SolicitudesFuncionarioConfig;
