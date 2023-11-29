import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, throwError, of, tap } from 'rxjs';

import { environments } from '../../../../environments/environments';
import { AuthService } from '../../../auth/services/auth.service';
import {
  LicenseData,
  LicenseResponse,
  LicenseResponseOne,
} from '../../interfaces/ms-business/license.interface';

@Injectable({
  providedIn: 'root',
})
export class LicenseService {
  private ms_business = environments.ms_business;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<LicenseResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<LicenseResponse>(`${this.ms_business}/licenses`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  show(id: number): Observable<LicenseResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<LicenseResponseOne>(`${this.ms_business}/licenses/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: LicenseData): Observable<LicenseResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .post<LicenseResponseOne>(`${this.ms_business}/licenses`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: LicenseData, id: number): Observable<LicenseResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<LicenseResponseOne>(`${this.ms_business}/licenses/${id}`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: number): Observable<LicenseResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<LicenseResponseOne>(`${this.ms_business}/licenses/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
