import { TestBed } from '@angular/core/testing';

import { DiscountServices } from './discount-services';

describe('DiscountServices', () => {
  let service: DiscountServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
