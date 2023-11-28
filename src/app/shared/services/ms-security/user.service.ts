import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { environments } from '../../../../environments/environments';
import {
  MatchProfileResponse,
  UserMatchRoleResponse,
} from '../../interfaces/ms-security/users.interface';
import { Response } from '../../interfaces/ms-security/users-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private ms_security = environments.ms_security;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  matchUserProfile(id_user_profile: string): Observable<Object> {
    if (!localStorage.getItem('token')) return of(false);

    const headers = this.authService.getHeaders();

    const user = this.authService.currentUser;

    return this.http
      .put<MatchProfileResponse>(
        `${this.ms_security}/users/user/${user._id}/user_profile/${id_user_profile}`,
        null,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  matchRole(id_role: string): Observable<Response> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    const user = this.authService.currentUser;

    return this.http
      .put<Response>(
        `${this.ms_security}/users/user/${user._id}/role/${id_role}`,
        null,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
