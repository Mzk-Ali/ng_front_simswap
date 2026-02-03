import { Component, inject, OnInit, signal } from '@angular/core';
import { Invoice } from '../../models/subscription.model';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { MainTitle } from '../../../../shared/components/main-title/main-title';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, MainTitle],
  templateUrl: './invoices.html',
  styleUrl: './invoices.css',
})
export class Invoices implements OnInit {
  private readonly invoiceService = inject(InvoiceService);

    invoices = signal<Invoice[]>([]);
    loading = signal(true);
    error = signal<string | null>(null);

    ngOnInit() {
        this.loadInvoices();
    }

    loadInvoices() {
        this.loading.set(true);
        this.error.set(null);

        this.invoiceService.getInvoices().subscribe({
            next: (invoices) => {
                this.invoices.set(invoices);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err.message || 'Erreur lors du chargement des factures');
                this.loading.set(false);
            }
        });
    }

    getStatusClass(status: string): string {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'status-paid';
            case 'open':
                return 'status-open';
            case 'void':
            case 'uncollectible':
                return 'status-void';
            default:
                return 'status-default';
        }
    }

    getStatusLabel(status: string): string {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'Payée';
            case 'open':
                return 'En attente';
            case 'void':
                return 'Annulée';
            case 'uncollectible':
                return 'Impayée';
            default:
                return status;
        }
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    formatAmount(amount: number, currency: string): string {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency.toUpperCase()
        }).format(amount);
    }
}
