import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, throwError } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { environments } from '../../../../environments/environments';
import {
  UserData,
  UserResponse,
  UserResponseOne,
} from '../../interfaces/ms-security/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private ms_security = environments.ms_security;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<UserResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<UserResponse>(`${this.ms_security}/users`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  show(id: string): Observable<UserResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<UserResponseOne>(`${this.ms_security}/users/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: UserData): Observable<UserResponseOne> {
    return this.http
      .post<UserResponseOne>(`${this.ms_security}/security/sign-up`, data)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: UserData, id: string): Observable<UserResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<UserResponseOne>(`${this.ms_security}/users/${id}`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: string): Observable<UserResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<UserResponseOne>(`${this.ms_security}/users/${id}`, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  matchUserProfile(id_user_profile: string): Observable<Response> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    const user = this.authService.currentUser;

    return this.http
      .put<Response>(
        `${this.ms_security}/users/user/${user._id}/user_profile/${id_user_profile}`,
        null,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  matchRole(id_user: string, id_role: string): Observable<UserResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<UserResponseOne>(
        `${this.ms_security}/users/user/${id_user}/role/${id_role}`,
        null,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  unMatchRole(id_user: string): Observable<UserResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<UserResponseOne>(
        `${this.ms_security}/users/user/${id_user}/role/`,
        null,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  matchUserCreditCard(
    id_user: string,
    id_credit_card: string,
  ): Observable<UserResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<UserResponseOne>(
        `${this.ms_security}/users/user/${id_user}/credit_card/${id_credit_card}`,
        null,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  unMatchUserCreditCard(
    id_user: string,
    id_credit_card: string,
  ): Observable<UserResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<UserResponseOne>(
        `${this.ms_security}/users/user/${id_user}/credit_card/${id_credit_card}`,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
