import { Injectable } from "@angular/core";
import { AuthResponse, AuthState } from "../models/auth.model";

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    getAccessToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refresh_token');
    }

    getTokenExpiresAt(): number | null {
        const expiresAt = localStorage.getItem('token_expires_at');
        return expiresAt ? Number.parseInt(expiresAt, 10) : null;
    }

    setTokens(authResponse: AuthResponse): void {
        localStorage.setItem('access_token', authResponse.accessToken);
        localStorage.setItem('refresh_token', authResponse.refreshToken);
    }

    clearTokens(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }



    isAuthenticated(): boolean {
        const token = this.getAccessToken();
        const expiresAt = this.getTokenExpiresAt();

        if (!token || !expiresAt) {
        return false;
        }

        return Date.now() < expiresAt + 30 * 1000;
    }

    shouldRefreshToken(): boolean {
        const expiresAt = this.getTokenExpiresAt();

        if (!expiresAt) {
            return false;
        }

        const timeUntilExpiry = expiresAt - Date.now();
        return timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0;
    }

    isTokenExpired(): boolean {
        const expiresAt = this.getTokenExpiresAt();

        if (!expiresAt) {
            return true;
        }

        return Date.now() > expiresAt;
    }

    getAuthState(): AuthState {
        return {
            isAuthenticated: this.isAuthenticated(),
            accessToken: this.getAccessToken(),
            refreshToken: this.getRefreshToken(),
            expiresAt: this.getTokenExpiresAt(),
        };
    }
}