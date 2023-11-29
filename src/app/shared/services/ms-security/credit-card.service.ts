import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, catchError, throwError } from 'rxjs';

import { environments } from '../../../../environments/environments';
import { AuthService } from '../../../auth/services/auth.service';
import {
  CreditCardResponse,
  CreditCardResponseOne,
  DataCreditCard,
} from '../../interfaces/ms-security/credit-card.interface';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private ms_security = environments.ms_security;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<CreditCardResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<CreditCardResponse>(`${this.ms_security}/credit-card`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  show(id: string): Observable<CreditCardResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<CreditCardResponseOne>(`${this.ms_security}/credit-card/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: DataCreditCard): Observable<CreditCardResponseOne> {
    const headers = this.authService.getHeaders();
    return this.http
      .post<CreditCardResponseOne>(`${this.ms_security}/credit-card`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: DataCreditCard, id: string): Observable<CreditCardResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<CreditCardResponseOne>(
        `${this.ms_security}/credit-card/${id}`,
        data,
        {
          headers,
        },
      )
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: string): Observable<CreditCardResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<CreditCardResponseOne>(`${this.ms_security}/credit-card/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
