import { TestBed } from '@angular/core/testing';

import { UseOneProducto } from './use-one-producto';

describe('UseOneProducto', () => {
  let service: UseOneProducto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseOneProducto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
