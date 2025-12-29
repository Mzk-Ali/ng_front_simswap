import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const messageService = inject(MessageService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Erreur: ${error.error.message}`;
            console.error('Erreur côté client:', error.error.message);
        } else {
            switch (error.status) {
                case 0:
                    errorMessage = 'Impossible de contacter le serveur';
                    break;
                case 400:
                    errorMessage = error.error?.message || 'Requête invalide';
                    break;
                case 401:
                    errorMessage = 'Non autorisé - Veuillez vous reconnecter';
                    break;
                case 403:
                    errorMessage = 'Accès refusé';
                    router.navigate(['/']);
                    break;
                case 404:
                    errorMessage = 'Ressource non trouvée';
                    break;
                case 409:
                    errorMessage = error.error?.message || 'Conflit de données';
                    break;
                case 422:
                    errorMessage = error.error?.message || 'Données invalides';
                    break;
                case 500:
                    errorMessage = 'Erreur serveur interne';
                    break;
                case 503:
                    errorMessage = 'Service temporairement indisponible';
                    break;
                default:
                    errorMessage = error.error?.message || `Erreur ${error.status}`;
            }

            console.error(`Erreur ${error.status}:`, error.error);
        }

        messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: errorMessage,
            life: 5000,
        });

        return throwError(() => new Error(errorMessage));
        })
    );
}