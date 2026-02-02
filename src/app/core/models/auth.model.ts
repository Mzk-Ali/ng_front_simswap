
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

export interface RegisterResponse {
    email: string;
    message: string;
}

export interface RefreshTokenRequest extends DeviceInfo {
    refreshToken: string;
}

export interface LogoutRequest extends DeviceInfo {
    refreshToken: string;
}

export interface TokensResponse  {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType?: string;
}

export interface EmailVerificationResponse {
    email: string;
    verified: boolean;
}

export interface LogoutResponse {
}

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
}

export interface VerifyEmailRequest {
    verifyEmailToken: string;
}