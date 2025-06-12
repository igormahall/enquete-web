import { TestBed } from '@angular/core/testing';

import { Enquete } from './enquete';

describe('Enquete', () => {
  let service: Enquete;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Enquete);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
