import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify-email',
  imports: [],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail implements OnInit {
  private readonly route            = inject(ActivatedRoute);
  private readonly router           = inject(Router);
  private readonly authService      = inject(AuthService);
  private readonly messageService   = inject(MessageService);

  isLoading = signal(true);

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('verifyEmail');
    if (token) {
      this.verify(token);
    } else {
      this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Token de vérification manquant.",
          life: 5000,
      });
      this.isLoading.set(false);
    }
  }

  private verify(token: string) {
    this.authService.verifyEmail(token).subscribe({
      next: () => {
        this.isLoading.set(false);
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: "Le lien de vérification est invalide ou expiré.",
            life: 5000,
        });
        this.isLoading.set(false);
      }
    });
  }
}
