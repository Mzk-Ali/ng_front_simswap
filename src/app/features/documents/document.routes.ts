import { Routes } from '@angular/router';
import { publicGuard } from '../../core/guards/auth.guard';

export const documentRoutes: Routes = [
    { 
        path: 'documents/privacy-policy',
        canActivate: [publicGuard],
        loadComponent: () => 
            import('./privacy-policy/privacy-policy').then(c => c.PrivacyPolicy),
        title: 'Politique de Confidentialité de FaceSwap'
    },
    { 
        path: 'documents/terms-of-service',
        canActivate: [publicGuard],
        loadComponent: () => 
            import('./terms-of-service/terms-of-service').then(c => c.TermsOfService),
        title: "Conditions d'utilisation de FaceSwap"
    },
    { 
        path: 'documents/sitemap',
        canActivate: [publicGuard],
        loadComponent: () => 
            import('./sitemap/sitemap').then(c => c.Sitemap),
        title: 'Site Map de FaceSwap'
    },
];
