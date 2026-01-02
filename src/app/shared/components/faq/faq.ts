import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [AccordionModule, CommonModule, AnimateOnScroll],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  tabs = [
    { title: 'Title 1', content: 'Content 1', value: '0' },
    { title: 'Title 2', content: 'Content 2', value: '1' },
    { title: 'Title 3', content: 'Content 3', value: '2' },
  ];
  tabs2 = [
    { title: 'Title 1', content: 'Content 1', value: '0' },
    { title: 'Title 2', content: 'Content 2', value: '1' },
    { title: 'Title 3', content: 'Content 3', value: '2' },
  ];
}
