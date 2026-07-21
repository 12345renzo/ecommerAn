import { TestBed } from '@angular/core/testing';

import { GetProducto } from './get-producto';

describe('GetProducto', () => {
  let service: GetProducto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProducto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
