import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigateByUrl('auth');
      }
    }),
    map((isAuthenticated) => !isAuthenticated),
  );
};

export const publicCanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};

export const publicCanMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[],
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};
