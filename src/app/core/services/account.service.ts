import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, tap } from "rxjs";
import { ApiResponse } from "../models/response.model";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private readonly http                   = inject(HttpClient);
    private readonly router                 = inject(Router);

    private readonly authService            = inject(AuthService);

    private readonly API_URL                = 'http://localhost:8888/api/v1/auth';


    deleteAccount(password: string): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.API_URL}/delete-account`, {
            body: { password }
        }).pipe(
            map(response => {
                if(!response.success || !response.data) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            tap(() => {
                this.authService.logout();
            }),
            catchError((error) => this.authService.handleAuthError(error))
        );
    }
}