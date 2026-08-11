import { TestBed } from '@angular/core/testing';

import { NewUsuario } from './new-usuario';

describe('NewUsuario', () => {
  let service: NewUsuario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewUsuario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
