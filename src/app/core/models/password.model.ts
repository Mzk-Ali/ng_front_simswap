export interface ForgotPasswordRequest {
    email: string;
}

export interface ChangePasswordRequest {
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,
}


export interface ResetPasswordRequest {
    resetToken: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface PasswordResetResponse {
    email: string;
    message: string;
}