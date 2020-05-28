import React from 'react';
import SwaggerUI from "./components/swagger";

const dashboardRoutes = [
    {
        path: "/test",
        name: i18n.t('test'),
        component: () => <SwaggerUI url={process.env.PUBLIC_URL + '/swagger/test.json'}/>
    }
];

export default dashboardRoutes;