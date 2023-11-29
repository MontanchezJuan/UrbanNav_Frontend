import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import {
  Trip,
  TripResponse,
} from '../../interfaces/ms-business/trip.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private ms_business = environments.ms_business;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<TripResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<TripResponse>(`${this.ms_business}/trips`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
