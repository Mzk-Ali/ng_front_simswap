import { Routes } from '@angular/router';

export const errorRoutes: Routes = [
    { 
        path: 'unauthorized',
        loadComponent: () => import('./unauthorized/unauthorized')
            .then(c => c.Unauthorized),
        title: 'Accès refusé - 403'
    },
    {
        path: 'not-found',
        loadComponent: () => import('./not-found/not-found')
            .then(c => c.NotFound),
        title: 'Page introuvable - 404'
    },
    {
        path: 'server-error',
        loadComponent: () => import('./server-error/server-error')
            .then(c => c.ServerError),
        title: 'Erreur serveur - 500'
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];