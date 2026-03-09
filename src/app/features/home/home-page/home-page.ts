import { Component } from '@angular/core';
import { Faq } from '../../../shared/components/faq/faq';
import { Pricing } from '../../../shared/components/pricing/pricing';
import { ProcessTimeline } from '../../../shared/components/process-timeline/process-timeline';

@Component({
  selector: 'app-home-page',
  imports: [Faq, Pricing, ProcessTimeline],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
