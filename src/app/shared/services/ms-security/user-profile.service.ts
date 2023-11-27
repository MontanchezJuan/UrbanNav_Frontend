import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError, of } from 'rxjs';

import { environments } from '../../../../environments/environments';
import { DataProfile } from '../../interfaces/ms-security/users-profile.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private ms_security = environments.ms_security;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  store(data: DataProfile): Observable<any> {
    if (!localStorage.getItem('token')) return of(false);

    const headers = this.authService.getHeaders();

    return this.http
      .post<any>(`${this.ms_security}/profiles`, data, { headers })
      .pipe(catchError((error) => throwError(() => error.message)));
  }
}
