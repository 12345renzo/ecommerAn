import { TestBed } from '@angular/core/testing';

import { GetAllProduct } from './get-all-product';

describe('GetAllProduct', () => {
  let service: GetAllProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllProduct);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
