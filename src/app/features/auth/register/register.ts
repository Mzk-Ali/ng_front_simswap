import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CheckboxModule, InputTextModule, PasswordModule, ButtonModule, MessageModule, DividerModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    private readonly fb             = inject(FormBuilder);
    private readonly authService    = inject(AuthService);
    private readonly router         = inject(Router);
    private readonly route          = inject(ActivatedRoute);
    private readonly messageService = inject(MessageService);

    registerForm: FormGroup;
    formSubmitted = false;

    isLoading = signal(false);

    errorMessage = signal<string | null>(null);

    mediumPasswordRegex = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
    strongPasswordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{8,})';

    constructor() {
        this.registerForm = this.fb.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [
                        Validators.required,
                        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/)
                    ]
                ],
                confirmPassword: ['', Validators.required],
                acceptTerms: [false, Validators.requiredTrue],
            },
            { validators: [this.passwordMatchValidator] }
        );
    }

    passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        return password && confirmPassword && password !== confirmPassword
            ? { passwordMismatch: true }
            : null;
    };

    // Password
    getPasswordValue(): string {
        return this.registerForm.get('password')?.value || '';
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
        return this.registerForm.get('confirmPassword')?.value || '';
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
        const password = this.getPasswordValue();
        const confirmPassword = this.getConfirmPasswordValue();
        return password !== '' && confirmPassword !== '' && password === confirmPassword;
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        const { email, password } = this.registerForm.value;

        this.authService.register(email, password).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Inscription réussie',
                    detail: response.message,
                    life: 3000,
                });

                this.router.navigate(['/login']);
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: "Erreur d'inscription",
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
        const control = this.registerForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
