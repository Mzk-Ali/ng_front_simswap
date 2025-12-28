import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    { 
        path: 'login', 
        loadComponent: () => 
            import('./login/login').then(c => c.Login),
        title: 'Simswap Login'
    },
    {
        path: 'register',
        loadComponent: () => 
            import('./register/register').then(c => c.Register),
        title: 'Simswap Register'
    }
];
