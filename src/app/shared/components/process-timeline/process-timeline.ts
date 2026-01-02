import { Component } from '@angular/core';
import { Timeline } from 'primeng/timeline';

@Component({
  selector: 'app-process-timeline',
  imports: [Timeline],
  templateUrl: './process-timeline.html',
  styleUrl: './process-timeline.css',
})
export class ProcessTimeline {
events: any[];

    constructor() {
        this.events = [
            { title: 'Ordered', description: 'lorekcdjdjncinvcdf'},
            { title: 'Ordered', description: 'lorekcdjdjncinvcdf'},
            { title: 'Ordered', description: 'lorekcdjdjncinvcdf'},
            { title: 'Ordered', description: 'lorekcdjdjncinvcdf'},
        ];
    }
}
