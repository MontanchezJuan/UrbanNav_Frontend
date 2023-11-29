import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, catchError, throwError } from 'rxjs';

import { environments } from '../../../../environments/environments';
import { AuthService } from '../../../auth/services/auth.service';
import {
  DataRole,
  RoleResponse,
  RoleResponseOne,
} from '../../interfaces/ms-security/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private ms_security = environments.ms_security;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<RoleResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<RoleResponse>(`${this.ms_security}/roles`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
  show(id: string): Observable<RoleResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<RoleResponseOne>(`${this.ms_security}/roles/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: DataRole): Observable<RoleResponseOne> {
    return this.http
      .post<RoleResponseOne>(`${this.ms_security}/roles`, data)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: DataRole, id: string): Observable<RoleResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<RoleResponseOne>(`${this.ms_security}/roles/${id}`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: string): Observable<RoleResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<RoleResponseOne>(`${this.ms_security}/roles/${id}`, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
  matchPermission(
    id_role: string,
    id_permission: string,
  ): Observable<RoleResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<RoleResponseOne>(
        `${this.ms_security}/users/role/${id_role}/permission/${id_permission}`,
        null,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  unMatchPermission(
    id_role: string,
    id_permission: string,
  ): Observable<RoleResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<RoleResponseOne>(
        `${this.ms_security}/users/role/${id_role}/permission/${id_permission}`,

        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
