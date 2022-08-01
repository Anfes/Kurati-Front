import React from 'react';
import { authRoles } from 'app/auth';
import Error404Page from './Error404Page';

const Error404PageConfig = {
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
    // auth: authRoles.onlyGuest,
    routes: [
        {
            path: '/404',
            component: Error404Page,
            // component: React.lazy(() => import('./Error404Page'))
        }
    ]
};

export default Error404PageConfig;