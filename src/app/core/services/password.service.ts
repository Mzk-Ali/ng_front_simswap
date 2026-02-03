import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { ChangePasswordRequest, ForgotPasswordRequest, PasswordResetResponse, ResetPasswordRequest } from "../models/password.model";
import { ApiResponse } from "../models/response.model";

@Injectable({
    providedIn: 'root',
})
export class PasswordService {
    private readonly http                   = inject(HttpClient);
    private readonly router                 = inject(Router);

    private readonly API_URL                = 'http://localhost:8888/api/v1/auth';

    changePassword(
        oldPassword: string,
        newPassword: string,
        confirmNewPassword: string
    ): Observable<ApiResponse<void>> {
        const changePasswordRequest: ChangePasswordRequest = {
            oldPassword,
            newPassword,
            confirmNewPassword,
        }

        return this.http.post<ApiResponse<void>>(`${this.API_URL}/change-password`, changePasswordRequest).pipe(
            map(response => {
                if(!response.success || !response.data) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            catchError((error) => this.handlePasswordError(error))
        );
    }

    forgotPassword(email: string): Observable<PasswordResetResponse> {
        const forgotPasswordRequest: ForgotPasswordRequest = {
            email
        };

        return this.http.post<ApiResponse<PasswordResetResponse>>(`${this.API_URL}/request-password-reset`, forgotPasswordRequest).pipe(
            map(response => {
                if(!response.success || !response.data) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            catchError((error) => this.handlePasswordError(error))
        );
    }

    resetPassword(
        resetToken: string,
        newPassword: string,
        confirmNewPassword: string
    ): Observable<void> {
        const ResetPasswordRequest: ResetPasswordRequest = {
            resetToken,
            newPassword,
            confirmNewPassword,
        };

        return this.http.post<ApiResponse<void>>(`${this.API_URL}/reset-password`, ResetPasswordRequest).pipe(
            map(response => {
                if(!response.success) {
                    throw new Error(response.message);
                }
                return;
            }),
            catchError((error) => this.handlePasswordError(error))
        );
    }

    private handlePasswordError(error: any): Observable<never> {
        console.error('Erreur mot de passe:', error);

        let errorMessage = 'Une erreur est survenue';

        if (error.status === 400) {
            errorMessage = error.error?.message || 'Requête invalide';
        } else if (error.status === 401) {
            errorMessage = 'Token invalide ou expiré';
        } else if (error.status === 404) {
            errorMessage = 'Utilisateur non trouvé';
        } else if (error.error?.message) {
            errorMessage = error.error.message;
        }

        return throwError(() => new Error(errorMessage));
    }
}