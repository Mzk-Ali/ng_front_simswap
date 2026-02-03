export interface SubscribeRequest {
    userId: string;
    planId: number;
};

export interface SubscribeResponse {
    subscriptionId: number;
    checkoutUrl: string;
    sessionId: string;
};

export interface SubscriptionPlanResponse {
    id: number;
    name: string;
    code: string;
    durationType: string;
    durationValue: number;
}

export interface UserSubscriptionResponse {
    id: string;
    userId: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    cancelledAt: string;
    stripeSubscriptionId?: string;
    createdAt: string;
}

export interface Invoice {
    id: string;
    amount: number;
    currency: string;
    status: string;
    invoiceUrl: string;
    invoicePdf: string;
    createdAt: string;
}