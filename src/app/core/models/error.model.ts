export interface ApiError {
    timestamp: string;
    status: number;
    error: string;
    code?: string;
    message: string;
    path: string;
    traceId: string;
    details?: string[];
    fieldErrors?: FieldError[];
}

export interface FieldError {
    field: string;
    message: string;
    rejectedValue?: any;
}

export enum ErrorCode {
    RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
    DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',
    BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
    EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
    RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}

export const ERROR_MESSAGES: Record<string, string> = {
    [ErrorCode.RESOURCE_NOT_FOUND]: "La ressource demandée n'existe pas",
    [ErrorCode.VALIDATION_ERROR]: 'Les données fournies sont invalides',
    [ErrorCode.AUTHENTICATION_ERROR]: 'Authentification requise',
    [ErrorCode.AUTHORIZATION_ERROR]: "Vous n'avez pas les permissions nécessaires",
    [ErrorCode.DUPLICATE_RESOURCE]: 'Cette ressource existe déjà',
    [ErrorCode.BUSINESS_RULE_VIOLATION]: "Cette action n'est pas autorisée",
    [ErrorCode.EXTERNAL_SERVICE_ERROR]: 'Un service externe est temporairement indisponible',
    [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Trop de requêtes. Veuillez patienter',
};