import { TestBed } from '@angular/core/testing';

import { UseProducto } from './use-producto';

describe('UseProducto', () => {
  let service: UseProducto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseProducto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
