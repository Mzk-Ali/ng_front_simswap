import { TestBed } from '@angular/core/testing';

import { AuthData } from './auth-data';

describe('AuthData', () => {
  let service: AuthData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
