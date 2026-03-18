import { TestBed } from '@angular/core/testing';

import { Creditcard } from './creditcard';

describe('Creditcard', () => {
  let service: Creditcard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Creditcard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
