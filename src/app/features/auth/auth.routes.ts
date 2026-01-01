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
    },
    {
        path: 'forgot-password',
        canActivate: [publicGuard],
        loadComponent: () => 
            import('./forgot-password/forgot-password').then(c => c.ForgotPassword),
        title: 'Mot de passe oublié'
    },
    {
        path: 'reset-password/:resetToken',
        canActivate: [publicGuard],
        loadComponent: () => 
            import('./reset-password/reset-password').then(c => c.ResetPassword),
        title: 'Réinitialiser le mot de passe'
    },
];
