import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PasswordService } from '../../../core/services/password.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, MessageModule, ToastModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private readonly fb             = inject(FormBuilder);
  private readonly passwordService    = inject(PasswordService);
  private readonly router         = inject(Router);
  private readonly route          = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);

  forgotPasswordForm: FormGroup;
  formSubmitted = false;

  isLoading = signal(false);

  errorMessage    = signal<string | null>(null);

  constructor() {
      this.forgotPasswordForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
      });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
        this.forgotPasswordForm.markAllAsTouched();
        return;
    }

    this.formSubmitted = true;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email } = this.forgotPasswordForm.value;

    this.passwordService.forgotPassword(email).subscribe({
        next: (response) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Email envoyé',
                detail: response.message,
                life: 10000,
            });

            this.forgotPasswordForm.reset();
            this.formSubmitted = false;

        },
        error: (error: Error) => {
            this.errorMessage.set(error.message);
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
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
    const control = this.forgotPasswordForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
