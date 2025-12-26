import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./layout/layout').then(c => c.Layout),
        children: [
            ... authRoutes,
        ]
    }
];
