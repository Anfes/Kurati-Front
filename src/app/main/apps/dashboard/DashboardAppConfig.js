import React from 'react';

const DashboardConfig = {
    settings: {
        layout: {
            config: {
                footer: {
                    display: false,
                },
            }
        }
    },
    routes: [
        {
            path: '/dashboard',
            component: React.lazy(() => import('./DashboardApp'))
        }
    ]
};

export default DashboardConfig;

