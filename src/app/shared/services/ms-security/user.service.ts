import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { environments } from '../../../../environments/environments';
import { UserMatchRoleResponse } from '../../interfaces/ms-security/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private ms_security = environments.ms_security;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  matchRole(id_role: string): Observable<Object> {
    if (!localStorage.getItem('token')) return of(false);

    const headers = this.authService.getHeaders();

    const user = this.authService.currentUser;

    return this.http
      .put(`${this.ms_security}/users/user/${user._id}/role/${id_role}`, null, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.message)));
  }
}
