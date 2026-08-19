import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Usuario } from '../service/usuario/usuario';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuario = inject(Usuario);

  if (usuario.useri()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};

export const isNotAuthenticatedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuario = inject(Usuario);

  if (!usuario.useri()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
