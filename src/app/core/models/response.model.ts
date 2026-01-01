export interface ApiResponse<T = any> {
    timestamp: string;
    status: number;
    success: boolean;
    message: string;
    code?: string;
    data?: T;
    path?: string;
    traceId?: string;
    metadata?: Record<string, any>;
}