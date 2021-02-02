import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

export const routes = [
    {
        exact: true,
        path: '/back-office-main',
        guard: true,
        component: lazy(() => import('../src/Components/BackOffice/BackOfficeMain'))
    },
    {
        exact: true,
        path: '/',
        // guard: true,
        component: lazy(() => import('../src/Components/Landing/LandingMian'))
    },
    {
        exact: true,
        path: '/login',
        // guard: true,
        component: lazy(() => import('../src/Components/Login/Login'))
    },
    {
        exact: true,
        path: '/registration',
        // guard: true,
        component: lazy(() => import('../src/Components/Registration/Registration'))
    },
    {
        exact: true,
        path: '/registration/:id',
        // guard: true,
        component: lazy(() => import('../src/Components/Registration/Registration'))
    },
    {
        exact: true,
        path: '/tutorial',
        // guard: true,
        component: lazy(() => import('../src/Components/Tutorial/Tutorial'))
    },

    {
        component: () => <Redirect to="/" />
    }
]