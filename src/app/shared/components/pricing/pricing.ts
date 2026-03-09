import { Component } from '@angular/core';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pricing',
  imports: [ButtonModule, AnimateOnScroll, RippleModule, RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {

}
