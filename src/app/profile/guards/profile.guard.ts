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
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

const checkProfile = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        const user = authService.currentUser;

        console.log({ user });
        console.log(user.userProfile);

        if (user.userProfile) {
          console.log('llego');

          router.navigateByUrl(`${user.role.name}`);
        }
      }
    }),
  );
};

export const profileCanMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[],
): boolean | Observable<boolean> => {
  return checkProfile();
};
