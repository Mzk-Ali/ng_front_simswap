import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { PasswordService } from '../../../../../core/services/password.service';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-password',
  imports: [ReactiveFormsModule, FormsModule, PasswordModule, CommonModule, ButtonModule, MessageModule, DividerModule],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export class Password {
    private readonly passwordService = inject(PasswordService);
    private readonly fb = inject(FormBuilder);
    private readonly messageService = inject(MessageService);

    passwordForm: FormGroup;

    formSubmitted = false;

    isLoading = signal(false);
    
    errorMessage = signal<string | null>(null);

    mediumPasswordRegex = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
    strongPasswordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{8,})';

    constructor() {
        this.passwordForm = this.fb.group(
            {
                oldPassword: ['', Validators.required],
                newPassword: ['', [
                        Validators.required,
                        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/)
                    ]
                ],
                confirmNewPassword: ['', Validators.required],
            },
            { validators: [this.passwordMatchValidator] }
        );
    }

    passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
        const newPassword = control.get('newPassword')?.value;
        const confirmNewPassword = control.get('confirmNewPassword')?.value;

        return newPassword && confirmNewPassword && newPassword !== confirmNewPassword
            ? { passwordMismatch: true }
            : null;
    };

    // Password
    getPasswordValue(): string {
        return this.passwordForm.get('newPassword')?.value || '';
    }

    hasLowercase(): boolean {
        return /[a-z]/.test(this.getPasswordValue());
    }

    hasUppercase(): boolean {
        return /[A-Z]/.test(this.getPasswordValue());
    }

    hasNumeric(): boolean {
        return /\d/.test(this.getPasswordValue());
    }

    hasSpecialChar(): boolean {
        return /[#?!@$%^&*-]/.test(this.getPasswordValue());
    }

    hasMinLength(): boolean {
        return this.getPasswordValue().length >= 8;
    }


    // Confirm Password
    getConfirmPasswordValue(): string {
        return this.passwordForm.get('confirmNewPassword')?.value || '';
    }

    hasConfirmLowercase(): boolean {
        return /[a-z]/.test(this.getConfirmPasswordValue());
    }

    hasConfirmUppercase(): boolean {
        return /[A-Z]/.test(this.getConfirmPasswordValue());
    }

    hasConfirmNumeric(): boolean {
        return /\d/.test(this.getConfirmPasswordValue());
    }

    hasConfirmSpecialChar(): boolean {
        return /[#?!@$%^&*-]/.test(this.getConfirmPasswordValue());
    }

    hasConfirmMinLength(): boolean {
        return this.getConfirmPasswordValue().length >= 8;
    }

    passwordsMatch(): boolean {
        const newPassword = this.getPasswordValue();
        const confirmNewPassword = this.getConfirmPasswordValue();
        return newPassword !== '' && confirmNewPassword !== '' && newPassword === confirmNewPassword;
    }

    onSubmit() {
        if (this.passwordForm.invalid) {
            this.passwordForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        const { oldPassword, newPassword, confirmNewPassword } = this.passwordForm.value;

        this.passwordService.changePassword(oldPassword, newPassword, confirmNewPassword).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Mot de passe modifié avec succès',
                    detail: response.message,
                    life: 3000,
                });
                this.passwordForm.reset();
                this.isLoading.set(false);
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: "Erreur du changement de mot de passe",
                    detail: error.message,
                    life: 5000,
                });
                this.isLoading.set(false);
            },
            complete: () => {
                this.isLoading.set(false);
            },
        });
    }

    isInvalid(controlName: string) {
        const control = this.passwordForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
