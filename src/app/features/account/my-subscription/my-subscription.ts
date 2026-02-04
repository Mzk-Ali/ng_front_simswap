import { Component, inject, OnInit, signal } from '@angular/core';
import { MainTitle } from '../../../shared/components/main-title/main-title';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Button } from "primeng/button";
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { SubscriptionService } from '../services/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-subscription',
  imports: [MainTitle, RadioButtonModule, Button, ReactiveFormsModule, MessageModule, DatePipe],
  templateUrl: './my-subscription.html',
  styleUrl: './my-subscription.css',
})
export class MySubscription implements OnInit {
    private readonly fb                   = inject(FormBuilder);
    private readonly subscriptionService  = inject(SubscriptionService);
    private readonly authService          = inject(AuthService);
    private readonly messageService       = inject(MessageService);
    private readonly router               = inject(Router);
    private readonly route                = inject(ActivatedRoute);

    subscriptionForm: FormGroup;
    formSubmitted: boolean = false;

    readonly hasSubscription = signal(false);
    subscription: string = 'Annuel';

    isLoading = signal(false);
        
    errorMessage = signal<string | null>(null);

    activeSubscriptionDetails = signal<any>(null);

    constructor() {
        this.subscriptionForm = this.fb.group({
            selectedSubscription: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadActiveSubscription();
    }


    isInvalid(controlName: string) {
        const control = this.subscriptionForm.get(controlName);
        return control?.invalid &&  this.formSubmitted;
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.subscriptionForm.invalid) {
            this.subscriptionForm.markAllAsTouched();
            return;
        }

        const user = this.authService.getCurrentUserSnapshot();
        if (!user) {
            this.authService.currentUser$.subscribe(u => {
                if (u) {
                    this.executeSubscription(u.authUserId, this.subscriptionForm.value.selectedSubscription);
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Session expirée', detail: 'Veuillez vous reconnecter' });
                }
            });
            return;
        }

        const planId: number = this.subscriptionForm.value.selectedSubscription;

        this.errorMessage.set(null);
        this.executeSubscription(user.authUserId, planId);
    }

    onCancelSubscription() {
        const activeSubscription = this.activeSubscriptionDetails();
        if (!activeSubscription) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Aucun abonnement actif trouvé.' });
            return;
        }
        this.isLoading.set(true);
        this.subscriptionService.cancelSubscription(Number(activeSubscription.id)).subscribe({
            next: (response) => {
                if(!response) {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible d\'annuler l\'abonnement.' });
                    return;
                }
                this.messageService.add({ severity: 'success', summary: 'Abonnement annulé', detail: 'Votre abonnement sera annulé à la fin de la période en cours.' });
                this.loadActiveSubscription();
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.message });
            },
            complete: () => this.isLoading.set(false)
        });
    }

    private executeSubscription(userId: string, planId: number) {
        this.isLoading.set(true);
        this.subscriptionService.subscribe(userId, planId).subscribe({
            next: (response) => {
                if (response?.checkoutUrl) {
                    globalThis.location.href = response.checkoutUrl;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'URL de paiement introuvable.'
                    });
                    this.isLoading.set(false);
                }
            },
            error: (err) => {
                this.errorMessage.set(err.message);
                this.isLoading.set(false);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Erreur', 
                    detail: err.message 
                });
            },
            complete: () => this.isLoading.set(false)
        });
    }

    private loadActiveSubscription() {
        const user = this.authService.getCurrentUserSnapshot();
        if (!user) return;

        this.isLoading.set(true);
        this.subscriptionService.getActiveSubscription(user.authUserId).subscribe({
            next: (response) => {
                if (response) {
                    this.hasSubscription.set(true);
                    this.activeSubscriptionDetails.set(response);
                    this.subscriptionForm.disable();
                } else {
                    this.hasSubscription.set(false);
                    this.subscriptionForm.enable();
                }
            },
            error: (err) => {
                this.hasSubscription.set(false);
                this.subscriptionForm.enable();
                console.error("Erreur lors de la récupération de l'abonnement", err);
            },
            complete: () => this.isLoading.set(false)
        });
    }

    getStatusClass(status: string): string {
        switch (status?.toUpperCase()) {
            case 'ACTIVE':
                return 'text-green-500';
            case 'PENDING':
                return 'text-amber-400';
            case 'PAST_DUE':
                return 'text-orange-600';
            case 'CANCELLED':
            case 'EXPIRED':
                return 'text-red-500';
            default:
                return 'text-slate-400';
        }
    }
}
