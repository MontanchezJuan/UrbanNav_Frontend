import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, throwError } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import {
  ServiceResponse,
  ServiceResponseOne,
} from '../../interfaces/ms-business/service.interface';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private ms_business = environments.ms_business;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<ServiceResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<ServiceResponse>(`${this.ms_business}/services`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  show(id: string): Observable<ServiceResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<ServiceResponseOne>(`${this.ms_business}/services/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: any): Observable<ServiceResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .post<ServiceResponseOne>(`${this.ms_business}/services`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: any, id: string): Observable<ServiceResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<ServiceResponseOne>(`${this.ms_business}/services/${id}`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: number): Observable<ServiceResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<ServiceResponseOne>(`${this.ms_business}/services/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
