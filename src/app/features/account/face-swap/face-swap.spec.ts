import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceSwap } from './face-swap';

describe('FaceSwap', () => {
  let component: FaceSwap;
  let fixture: ComponentFixture<FaceSwap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaceSwap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceSwap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
