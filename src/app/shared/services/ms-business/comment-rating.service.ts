import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, throwError } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CommentRatingService {
  private ms_business = environments.ms_business;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<any> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<any>(`${this.ms_business}/bills`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  show(id: string): Observable<any> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<any>(`${this.ms_business}/bills/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: any): Observable<any> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .post<any>(`${this.ms_business}/bills`, data, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: any, id: string): Observable<any> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<any>(`${this.ms_business}/bills/${id}`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: string): Observable<any> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<any>(`${this.ms_business}/bills/${id}`, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
