import { Routes } from '@angular/router';
import { publicGuard, authGuard } from '../../core/guards/auth.guard';

export const accountRoutes: Routes = [
    { 
        path: 'face-swap',
        canActivate: [authGuard],
        loadComponent: () => 
            import('./face-swap/face-swap').then(c => c.FaceSwap),
        title: 'Face Swap'
    },
    { 
        path: 'mon-abonnement',
        canActivate: [authGuard],
        loadComponent: () => 
            import('./my-subscription/my-subscription').then(c => c.MySubscription),
        title: 'Mon Abonnement'
    },
    { 
        path: 'mes-factures',
        canActivate: [authGuard],
        loadComponent: () => 
            import('./pages/invoices/invoices').then(c => c.Invoices),
        title: 'Mes Factures'
    },
    { 
        path: 'mes-parametres',
        canActivate: [authGuard],
        loadComponent: () => 
            import('./pages/setting/setting').then(c => c.Setting),
        title: 'Mes Paramètres'
    },
];
