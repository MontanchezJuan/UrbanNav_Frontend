import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import {
  DataLogin,
  DataSingup,
  DataToken,
  Response,
  User,
} from '../interfaces/auth.interface';
import { Observable, tap, of, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.ms_security;
  private user?: User | null;

  constructor(private http: HttpClient) {}

  get currentUser(): User {
    if (!this.user) return Object();

    return structuredClone(this.user);
  }

  login(data: DataLogin): Observable<DataToken> {
    return this.http
      .post<DataToken>(`${this.baseUrl}/security/login`, data)
      .pipe(
        tap((response) => localStorage.setItem('token', response.data)),
        catchError((error) => throwError(() => error.message)),
      );
  }

  signup(data: DataLogin): Observable<DataSingup> {
    return this.http
      .post<DataSingup>(`${this.baseUrl}/security/sign-up`, data)
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  getHeaders(): HttpHeaders {
    const token: string | null = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Access-Control-Allow-Origin': 'http://localhost:4200',
      // 'Access-Control-Allow-Credentials': 'true',
    });
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const headers = this.getHeaders();

    return this.http
      .get<Response>(`${this.baseUrl}/security/get-user`, {
        headers,
      })
      .pipe(
        tap((response) => (this.user = response.data)),
        map((user) => !!user),
        catchError((error) => throwError(() => error.message)),
      );
  }

  redirectToAccount(): string {
    if (!this.user) return '';

    if (this.user.role.name === 'default') return 'profile';

    // if (!this.user.role.name) return 'profile/license';

    if (!this.user.userProfile) return 'profile/costumize-profile';

    return `${this.user.role.name}`;
  }

  logout(): void {
    localStorage.clear();
  }
}
