import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { errorRoutes } from './features/errors/error.routes';
import { authGuard, roleGuard } from './core/guards/auth.guard';
import { accountRoutes } from './features/account/account.routes';
import { documentRoutes } from './features/documents/document.routes';

export const routes: Routes = [
    {
        path: 'admin',
        canActivate: [authGuard, roleGuard(['admin'])],
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
    },
    {
        path: '',
        loadComponent: () => 
            import('./layout/layout').then(c => c.Layout),
        children: [
            {
                path: '',
                loadComponent: () =>
                import('./features/home/home-page/home-page')
                    .then(m => m.HomePage),
            },
            ... authRoutes,
            ... accountRoutes,
            ... documentRoutes,
            ... errorRoutes,
        ]
    },
];
