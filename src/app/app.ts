import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ToastModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('ng_front_simswap');
  constructor(
    private readonly primeng: PrimeNG,
  ) {}
  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }
}
