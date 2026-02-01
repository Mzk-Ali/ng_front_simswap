import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable } from "rxjs";
import { SubscribeRequest, SubscribeResponse } from "../models/subscription.model";
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
}