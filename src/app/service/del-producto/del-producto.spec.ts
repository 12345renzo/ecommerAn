import { TestBed } from '@angular/core/testing';

import { DelProducto } from './del-producto';

describe('DelProducto', () => {
  let service: DelProducto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelProducto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
