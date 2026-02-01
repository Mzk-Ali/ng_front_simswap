export interface SubscribeRequest {
    userId: string;
    planId: number;
};

export interface SubscribeResponse {
    subscriptionId: number;
    checkoutUrl: string;
    sessionId: string;
};