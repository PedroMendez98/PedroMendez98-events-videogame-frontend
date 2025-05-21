import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const roles = auth.getUserRoles();
  console.log('adminGuard roles:', roles);
  return roles.includes('ADMIN')
    ? true
    : router.parseUrl('/');
};