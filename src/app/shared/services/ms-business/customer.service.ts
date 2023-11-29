import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, throwError } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import {
  CustomerResponse,
  CustomerResponseOne,
  CustomerData,
} from '../../interfaces/ms-business/customer.interface';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private ms_business = environments.ms_business;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<CustomerResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<CustomerResponse>(`${this.ms_business}/customers`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  show(id: number): Observable<CustomerResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<CustomerResponseOne>(`${this.ms_business}/customers/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: CustomerData): Observable<CustomerResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .post<CustomerResponseOne>(`${this.ms_business}/customers`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: CustomerData, id: string): Observable<CustomerResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<CustomerResponseOne>(`${this.ms_business}/customers/${id}`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: number): Observable<CustomerResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<CustomerResponseOne>(`${this.ms_business}/customers/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
