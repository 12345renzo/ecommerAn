import { TestBed } from '@angular/core/testing';

import { NewProducto } from './new-producto';

describe('NewProducto', () => {
  let service: NewProducto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewProducto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
