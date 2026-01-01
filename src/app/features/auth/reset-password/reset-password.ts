import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { PasswordService } from '../../../core/services/password.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, DividerModule, MessageModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
    private readonly fb               = inject(FormBuilder);
    private readonly passwordService  = inject(PasswordService);
    private readonly router           = inject(Router);
    private readonly route            = inject(ActivatedRoute);
    private readonly messageService   = inject(MessageService);

    resetPasswordForm: FormGroup;
    formSubmitted = false;

    isLoading = signal(false);

    errorMessage = signal<string | null>(null);

    resetToken = signal<string | null>(null);

    mediumPasswordRegex = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
    strongPasswordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{8,})';

    constructor() {
        this.resetPasswordForm = this.fb.group(
            {
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

    ngOnInit(): void {
      const token = this.route.snapshot.paramMap.get('resetToken');
      if(!token) {
        this.errorMessage.set('Token de réinitialisation manquant');
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Lien de réinitialisation invalide',
          life: 5000,
        });

        setTimeout(() => {
          this.router.navigate(['forgot-password']);
        }, 10000);

        return;
      }
      this.resetToken.set(token);
    }

    passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
        const newPassword = control.get('newPassword')?.value;
        const confirmNewPassword = control.get('confirmNewPassword')?.value;

        return newPassword && confirmNewPassword && newPassword !== confirmNewPassword
            ? { passwordMismatch: true }
            : null;
    };

    // New Password
    getPasswordValue(): string {
        return this.resetPasswordForm.get('newPassword')?.value || '';
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
        return this.resetPasswordForm.get('confirmNewPassword')?.value || '';
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
      this.formSubmitted = true;
      this.errorMessage.set(null);

      if (this.resetPasswordForm.invalid) {
          this.messageService.add({
              severity: 'warn',
              summary: 'Formulaire invalide',
              detail: 'Veuillez corriger les erreurs dans le formulaire',
              life: 5000,
          });
          return;
      }

      const token = this.resetToken();

      if (!token) {
          this.errorMessage.set('Token manquant');
          this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Token de réinitialisation manquant',
              life: 5000,
          });
          return;
      }

      this.isLoading.set(true);

      const { newPassword, confirmNewPassword } = this.resetPasswordForm.value;

      this.passwordService.resetPassword(token, newPassword, confirmNewPassword).subscribe({
        next: () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Mot de passe réinitialisé',
                detail: 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.',
                life: 5000,
            });

            this.resetPasswordForm.reset();
            this.formSubmitted = false;

            setTimeout(() => {
                this.router.navigate(['/login']);
            }, 2000);
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
      })
    }

    isInvalid(controlName: string) {
        const control = this.resetPasswordForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
