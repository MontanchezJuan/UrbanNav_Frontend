import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, throwError } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import {
  DriverResponse,
  DriverResponseOne,
} from '../../interfaces/ms-business/drivers.interface';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private ms_business = environments.ms_business;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<DriverResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<DriverResponse>(`${this.ms_business}/customers`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  show(id: string): Observable<DriverResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<DriverResponseOne>(`${this.ms_business}/customers/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: any): Observable<DriverResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .post<DriverResponseOne>(`${this.ms_business}/customers`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: any, id: string): Observable<DriverResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<DriverResponseOne>(`${this.ms_business}/customers/${id}`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: number): Observable<DriverResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<DriverResponseOne>(`${this.ms_business}/customers/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
