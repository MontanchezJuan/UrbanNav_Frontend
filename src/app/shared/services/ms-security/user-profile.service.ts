import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError, of, tap } from 'rxjs';

import { environments } from '../../../../environments/environments';
import {
  DataUserProfile,
  Response,
  ResponseOne,
} from '../../interfaces/ms-security/users-profile.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private ms_security = environments.ms_security;
  private userProfile?: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  get currentUserProfile(): any {
    if (!this.userProfile) return Object();

    return structuredClone(this.userProfile);
  }

  index(): Observable<Response> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<Response>(`${this.ms_security}/profiles`, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  show(id: string): Observable<ResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<ResponseOne>(`${this.ms_security}/profiles/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: DataUserProfile): Observable<ResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .post<ResponseOne>(`${this.ms_security}/profiles`, data, { headers })
      .pipe(
        tap((response) => (this.userProfile = response.data)),
        catchError((error) => throwError(() => error.error.message)),
      );
  }

  update(data: DataUserProfile, id: string): Observable<ResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .put<ResponseOne>(`${this.ms_security}/profiles/${id}`, data, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: string): Observable<ResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<ResponseOne>(`${this.ms_security}/profiles/${id}`, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
