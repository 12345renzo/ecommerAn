import { TestBed } from '@angular/core/testing';

import { GetUsuario } from './get-usuario';

describe('GetUsuario', () => {
  let service: GetUsuario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUsuario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
