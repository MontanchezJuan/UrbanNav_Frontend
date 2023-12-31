import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import {
  AuthResponse,
  DataLogin,
  DataToken,
} from '../interfaces/auth.interface';
import { User } from '../../shared/interfaces/ms-security/users.interface';
import { Observable, tap, of, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ms_security = environments.ms_security;
  private user?: User | null;

  constructor(private http: HttpClient) {}

  get currentUser(): User {
    if (!this.user) return Object();

    return structuredClone(this.user);
  }

  login(data: DataLogin): Observable<DataToken> {
    return this.http
      .post<DataToken>(`${this.ms_security}/security/login`, data)
      .pipe(
        tap((response) => localStorage.setItem('token', response.data)),
        catchError((error) => throwError(() => error.error.message)),
      );
  }

  signup(data: DataLogin): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.ms_security}/security/sign-up`, data)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  getUser(): Observable<AuthResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.getHeaders();

    return this.http
      .get<AuthResponse>(`${this.ms_security}/security/get-user`, {
        headers,
      })
      .pipe(
        tap((response) => (this.user = response.data)),
        catchError((error) => throwError(() => error.error.message)),
      );
  }

  getHeaders(): HttpHeaders {
    const token: string | null = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const headers = this.getHeaders();

    return this.http
      .get<AuthResponse>(`${this.ms_security}/security/get-user`, {
        headers,
      })
      .pipe(
        tap((response) => (this.user = response.data)),
        map((user) => !!user),
        catchError((error) => {
          localStorage.clear();
          return throwError(() => error.error.message);
        }),
      );
  }

  redirectToAccount(): string {
    if (!this.user) return 'home';

    if (this.user.role.name === 'default') return 'profile';

    // if (!this.user.role.name) return 'profile/license';

    if (!this.user.userProfile) return 'profile/costumize-profile';

    return `${this.user.role.name}`;
  }

  logout(): void {
    localStorage.clear();
  }
}
