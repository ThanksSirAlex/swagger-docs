import React from 'react';
import SwaggerUI from "./components/swagger";
import i18n from './i18n'

const dashboardRoutes = [
  {
    path: "/swagger",
    name: "Swagger",
    component: () => <SwaggerUI url = {process.env.PUBLIC_URL + '/swagger/swagger.json'} />
  },
  {
    path: "/user",
    name: "User Profile",
    component: () => <SwaggerUI  />
  },
  {
    path: "/table",
    name: "Table List",
    component: () => <SwaggerUI  />
  },
  {
    path: "/typography",
    name: "Typography",
    component: () => <SwaggerUI  />
  },
  {
    path: "/icons",
    name: "Icons",
    component: () => <SwaggerUI  />
  },
  {
    path: "/maps",
    name: "Maps",
    component: () => <SwaggerUI  />
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => <SwaggerUI  />
  },
  {
    path: "/test",
    name: i18n.t('test'),
    component: () => <SwaggerUI  />
  }
];

export default dashboardRoutes;
