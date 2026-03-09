import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTimeline } from './process-timeline';

describe('ProcessTimeline', () => {
  let component: ProcessTimeline;
  let fixture: ComponentFixture<ProcessTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
