import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, throwError } from "rxjs";
import { SubscribeRequest, SubscribeResponse, UserSubscriptionResponse } from "../models/subscription.model";
import { ApiResponse } from "../../../core/models/response.model";
import { User } from "../../../core/models/user.model";


@Injectable({
    providedIn: 'root',
})
export class SubscriptionService {
    private readonly http                   = inject(HttpClient);

    private readonly API_URL                = 'http://localhost:8888/api/v1/subscriptions';

    private readonly currentUserSubject     = new BehaviorSubject<User | null>(null);
    public readonly currentUser$            = this.currentUserSubject.asObservable();


    subscribe(userId: string, planId: number): Observable<SubscribeResponse> {
        const subscribeRequest: SubscribeRequest = {
            userId,
            planId
        };

        return this.http.post<ApiResponse<SubscribeResponse>>(`${this.API_URL}/subscribe`, subscribeRequest).pipe(
            map(response => {
                if(!response.success || !response.data) {
                    console.log(response);
                    throw new Error(response.message);
                }
                return response.data;
            }),
        );
    }

    cancelSubscription(subscriptionId: number): Observable<UserSubscriptionResponse | void> {
        return this.http.put<ApiResponse<UserSubscriptionResponse>>(`${this.API_URL}/${subscriptionId}/cancel`, {}).pipe(
            map(response => {
                if(!response.success) {
                    console.log(response);
                    throw new Error(response.message);
                }
                return response.data;
            }),
            catchError((error) => this.handleError(error))
        );
    }

    getActiveSubscription(userId: string): Observable<UserSubscriptionResponse | void> {
        return this.http.get<ApiResponse<UserSubscriptionResponse>>(`${this.API_URL}/user/${userId}`).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    handleError(error: any): Observable<never> {
        let errorMessage = 'Une erreur est survenue';
        
        if (error.error?.message) {
            errorMessage = error.error.message;
        } else if (error.status === 404) {
            errorMessage = "Abonnement introuvable";
        }

        return throwError(() => new Error(errorMessage));
    }
}