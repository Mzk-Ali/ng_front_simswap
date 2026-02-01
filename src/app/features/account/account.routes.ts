import { Routes } from '@angular/router';
import { publicGuard, authGuard } from '../../core/guards/auth.guard';

export const accountRoutes: Routes = [
    { 
        path: 'face-swap',
        canActivate: [publicGuard],
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
];
