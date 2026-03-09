import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, switchMap, throwError } from "rxjs";
import { TokenService } from "../services/token.service";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService   = inject(AuthService);
    const tokenService  = inject(TokenService);


    const publicUrls = ['/auth/login', '/auth/register', '/auth/refresh-token'];

    const isPublicUrl = publicUrls.some((url) => req.url.includes(url));
    
    if (isPublicUrl) {
        return next(req);
    }

    const token = tokenService.getAccessToken();

    if (!token) {
        return next(req);
    }

    const clonedRequest = addAuthHeader(req, token);

    return next(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        const newToken = tokenService.getAccessToken();

                        if (!newToken) {
                            authService.logout();
                            return throwError(() => new Error('Impossible de rafraîchir le token'));
                        }

                        const clonedRequest = addAuthHeader(req, newToken);
                        return next(clonedRequest);
                    }),
                    catchError((error) => {
                        authService.logout();
                        return throwError(() => error);
                    })
                );
            }
            return throwError(() => error);
        })
    );
    
}

function addAuthHeader(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
}