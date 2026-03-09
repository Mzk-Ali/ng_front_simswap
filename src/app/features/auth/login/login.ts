import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CheckboxModule, InputTextModule, PasswordModule, ButtonModule, MessageModule, ToastModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    private readonly fb             = inject(FormBuilder);
    private readonly authService    = inject(AuthService);
    private readonly router         = inject(Router);
    private readonly route          = inject(ActivatedRoute);
    private readonly messageService = inject(MessageService);

    loginForm: FormGroup;
    formSubmitted = false;

    isLoading = signal(false);
    
    errorMessage = signal<string | null>(null);

    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [false],
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        const { email, password } = this.loginForm.value;

        this.authService.login(email, password).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Connexion réussie',
                    detail: 'Bienvenue !',
                    life: 3000,
                });

                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate([returnUrl]);
            },
            error: (error: Error) => {
                this.errorMessage.set(error.message);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur de connexion',
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
        const control = this.loginForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
