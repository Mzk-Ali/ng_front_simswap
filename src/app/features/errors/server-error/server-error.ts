import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-server-error',
  imports: [ButtonModule, RouterModule],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  reload(): void {
    globalThis.location.reload();
  }
}
