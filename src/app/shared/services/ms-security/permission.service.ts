import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';

import { environments } from '../../../../environments/environments';
import {
  DataPermission,
  PermissionResponse,
  PermissionResponseOne,
} from '../../interfaces/ms-security/permission.interface';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private ms_security = environments.ms_security;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<PermissionResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<PermissionResponse>(`${this.ms_security}/permissions`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
  show(id: string): Observable<PermissionResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<PermissionResponseOne>(`${this.ms_security}/permissions/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: DataPermission): Observable<PermissionResponseOne> {
    return this.http
      .post<PermissionResponseOne>(`${this.ms_security}/permissions`, data)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: DataPermission, id: string): Observable<PermissionResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<PermissionResponseOne>(
        `${this.ms_security}/permissions/${id}`,
        data,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: string): Observable<PermissionResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<PermissionResponseOne>(`${this.ms_security}/permissions/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
