import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        const redirectTo = authService.redirectToAccount();
        router.navigateByUrl(redirectTo);
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
