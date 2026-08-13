import { TestBed } from '@angular/core/testing';

import { UpdProducto } from './upd-producto';

describe('UpdProducto', () => {
  let service: UpdProducto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdProducto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
