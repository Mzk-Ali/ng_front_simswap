import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  constructor(private readonly primeng: PrimeNG) {}
  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }
  protected readonly title = signal('ng_front_simswap');
}
