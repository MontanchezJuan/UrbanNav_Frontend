import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Router,
  CanMatchFn,
  Route,
  UrlSegment,
} from '@angular/router';

import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        localStorage.clear();
        router.navigateByUrl('auth');
      }
    }),
  );
};

export const authCanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};

export const authCanMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[],
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};
