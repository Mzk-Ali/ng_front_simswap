import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../../../core/services/account.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, FormsModule, PasswordModule, CommonModule, ButtonModule, MessageModule, DividerModule, ConfirmDialogModule, ToastModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
    private readonly accountService = inject(AccountService);
    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    formSubmitted = false;

    isLoading = signal(false);
    
    errorMessage = signal<string | null>(null);

    showDeleteConfirm = signal(false);

    deleteForm: FormGroup;

    constructor() {
        this.deleteForm = this.fb.group({
            password: ['', [Validators.required]],
            confirmation: ['', [Validators.required]]
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Êtes-vous absolument sûr de supprimer votre compte ?',
            header: 'Confirmation de suppression',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Annuler',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'je confirme',
                severity: 'danger'
            },
        
            accept: () => {
                this.confirmDelete();
            },
            reject: () => {
                this.cancelDelete();
                this.messageService.add({ severity: 'error', summary: 'Abandon', detail: 'Suppression de compte abandonnée' });
            }
        });
    }

    cancelDelete() {
        this.showDeleteConfirm.set(false);
        this.deleteForm.reset();
    }

    confirmDelete() {
        this.isLoading.set(true);
        this.errorMessage.set(null);

        const password = this.deleteForm.get('password')?.value;

        this.accountService.deleteAccount(password).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Compte supprimé avec succès',
                    detail: response.message,
                    life: 3000,
                });
                this.deleteForm.reset();
                this.isLoading.set(false);
                this.router.navigate(['/']);
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: "Erreur lors de la suppression de compte",
                    detail: error.message,
                    life: 5000,
                });
                this.errorMessage.set(error.message || 'Erreur lors de la suppression du compte');
                this.isLoading.set(false);
                this.showDeleteConfirm.set(false);
                this.isLoading.set(false);
            },
            complete: () => {
                this.isLoading.set(false);
            },
        });
    }

    isInvalid(controlName: string) {
        const control = this.deleteForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
