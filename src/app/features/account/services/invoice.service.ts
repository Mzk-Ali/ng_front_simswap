import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Invoice } from "../models/subscription.model";
import { ApiResponse } from "../../../core/models/response.model";
import { User } from "../../../core/models/user.model";


@Injectable({
    providedIn: 'root',
})
export class InvoiceService {
    private readonly http                   = inject(HttpClient);

    private readonly API_URL                = 'http://localhost:8888/api/v1/invoices';

    private readonly currentUserSubject     = new BehaviorSubject<User | null>(null);
    public readonly currentUser$            = this.currentUserSubject.asObservable();

    getInvoices(): Observable<Invoice[]> {
        return this.http.get<ApiResponse<Invoice[]>>(`${this.API_URL}`).pipe(
            map(response => {
                if (!response.success || !response.data) {
                    throw new Error(response.message || 'Erreur récupération factures');
                }
                return response.data;
            })
        );
    }
}