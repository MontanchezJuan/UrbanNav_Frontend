import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { DataUser, User } from '../interfaces/user.interface';
import { Observable, tap, of, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.ms_security;
  private user?: User;
  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(data: DataUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/security/login`, data);
    // .pipe();
    // tap((user) => console.log(user)),
    // tap((user) => (this.user = user)),
    // tap((user) => localStorage.setItem('token', user.id)),
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/`).pipe(
      tap((user) => (this.user = user)),
      map((user) => !!user),
      catchError((error) => of(false)),
    );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
