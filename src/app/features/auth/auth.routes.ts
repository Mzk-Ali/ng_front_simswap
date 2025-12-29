import { Routes } from '@angular/router';
import { publicGuard } from '../../core/guards/auth.guard';

export const authRoutes: Routes = [
    { 
        path: 'login',
        canActivate: [publicGuard],
        loadComponent: () => 
            import('./login/login').then(c => c.Login),
        title: 'Simswap Login'
    },
    {
        path: 'register',
        canActivate: [publicGuard],
        loadComponent: () => 
            import('./register/register').then(c => c.Register),
        title: 'Simswap Register'
    }
];
