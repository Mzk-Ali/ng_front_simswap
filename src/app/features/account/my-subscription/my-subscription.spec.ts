import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubscription } from './my-subscription';

describe('MySubscription', () => {
  let component: MySubscription;
  let fixture: ComponentFixture<MySubscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySubscription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySubscription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
