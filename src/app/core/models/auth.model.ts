
export interface DeviceInfo {
    deviceName: string;
    userAgent: string;
    ipAddress: string;
}

export interface LoginRequest extends DeviceInfo {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface RefreshTokenRequest extends DeviceInfo {
    refreshToken: string;
}

export interface LogoutRequest extends DeviceInfo {
    refreshToken: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType?: string;
}

export interface LogoutResponse {
}

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
}