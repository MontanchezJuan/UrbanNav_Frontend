import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private ms_security = environments.ms_security;
  private ms_business = environments.ms_business;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  matchRole(id_role: string): Observable<any> {
    if (!localStorage.getItem('token')) return of(false);

    const headers = this.authService.getHeaders();

    const user = this.authService.currentUser;

    return this.http.post(
      `${this.ms_security}/users/user/${user._id}/role/${id_role}`,
      { headers },
    );
  }
}
