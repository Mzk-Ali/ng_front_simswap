import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { DeviceInfoService } from "./device-info.service";
import { Router } from "@angular/router";
import { AuthState, LoginRequest, LogoutRequest, RefreshTokenRequest, RegisterRequest, RegisterResponse, TokensResponse } from "../models/auth.model";
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap, throwError } from "rxjs";
import { User } from "../models/user.model";
import { TokenService } from "./token.service";
import { ApiResponse } from "../models/response.model";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http                   = inject(HttpClient);
    private readonly router                 = inject(Router);
    private readonly tokenService           = inject(TokenService);
    private readonly deviceInfoService      = inject(DeviceInfoService);

    private readonly API_URL                = 'http://localhost:8888/api/v1/auth';

    private readonly currentUserSubject     = new BehaviorSubject<User | null>(null);
    public readonly currentUser$            = this.currentUserSubject.asObservable();

    public readonly isAuthenticated         = signal<boolean>(false);
    private readonly refreshTokenSubject    = new BehaviorSubject<string | null>(null);
    private isRefreshing                    = false;

    login(email: string, password: string): Observable<TokensResponse> {
        const deviceInfo = this.deviceInfoService.getDeviceInfo();

        const loginRequest: LoginRequest = {
            email,
            password,
            ...deviceInfo,
        };

        return this.http.post<ApiResponse<TokensResponse>>(`${this.API_URL}/authenticate`, loginRequest).pipe(
            map(response => {
                if(!response.success || !response.data) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            tap((tokens) => this.handleAuthSuccess(tokens)),
            catchError((error) => this.handleAuthError(error))
        );
    }

    register(email: string, password: string): Observable<RegisterResponse> {
        const registerRequest: RegisterRequest = {
            email,
            password,
        };

        return this.http.post<ApiResponse<RegisterResponse>>(`${this.API_URL}/register`, registerRequest).pipe(
            map(response => {
                if(!response.success || !response.data) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            catchError((error) => this.handleAuthError(error))
        );
    }

    refreshToken(): Observable<TokensResponse> {
        const refreshToken = this.tokenService.getRefreshToken();

        if (!refreshToken) {
            return throwError(() => new Error('Aucun refresh token disponible'));
        }

        if (this.isRefreshing) {
            return this.refreshTokenSubject.pipe(
                map((token) => {
                    if (!token) {
                        throw new Error('Échec du rafraîchissement du token');
                    }
                    return { accessToken: token } as TokensResponse;
                })
            );
        }

        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        const deviceInfo = this.deviceInfoService.getDeviceInfo();

        const refreshRequest: RefreshTokenRequest = {
            refreshToken,
            ...deviceInfo,
        };

        return this.http.post<ApiResponse<TokensResponse>>(`${this.API_URL}/refresh-token`, refreshRequest).pipe(
            map(response => {
                if(!response.success || !response.data) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            tap((tokens) => {
                this.tokenService.setTokens(tokens);
                this.refreshTokenSubject.next(tokens.accessToken);
            }),
            catchError((error) => {
                this.logout();
                return throwError(() => error);
            }),
            finalize(() => {
                this.isRefreshing = false;
            })
        );
    }

    logout(): void {
        const deviceInfo = this.deviceInfoService.getDeviceInfo();
        const refreshToken = this.tokenService.getRefreshToken();
        
        if (!refreshToken) {
            this.tokenService.clearTokens();
            this.currentUserSubject.next(null);
            this.isAuthenticated.set(false);
            this.router.navigate(['/login']);
            return;
        }

        const logoutRequest: LogoutRequest = {
            refreshToken,
            ...deviceInfo,
        };

        this.http.post<ApiResponse<void>>(`${this.API_URL}/logout`, { logoutRequest }).pipe(
                catchError(() => of(null))
            )
            .subscribe();

        this.tokenService.clearTokens();
        this.currentUserSubject.next(null);
        this.isAuthenticated.set(false);
        this.router.navigate(['/login']);
    }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/me`).pipe(
            tap((user) => {
                this.currentUserSubject.next(user);
                localStorage.setItem('user_data', JSON.stringify(user));
            }),
            catchError((error) => {
                console.error("Erreur lors de la récupération de l'utilisateur:", error);
                return throwError(() => error);
            })
        );
    }

    isUserAuthenticated(): boolean {
        return this.tokenService.isAuthenticated();
    }

    getAuthState(): AuthState {
        return this.tokenService.getAuthState();
    }

    private handleAuthSuccess(response: TokensResponse): void {
        this.tokenService.setTokens(response);
        this.isAuthenticated.set(true);

        this.getCurrentUser().subscribe();
    }

    private handleAuthError(error: any): Observable<never> {
        console.error('Erreur d\'authentification:', error);

        let errorMessage = 'Une erreur est survenue';

        if (error.status === 401) {
            errorMessage = 'Email ou mot de passe incorrect';
        } else if (error.status === 403) {
            errorMessage = 'Accès refusé';
        } else if (error.status === 409) {
            errorMessage = 'Cet email est déjà utilisé';
        } else if (error.error?.message) {
            errorMessage = error.error.message;
        }

        return throwError(() => new Error(errorMessage));
    }
}