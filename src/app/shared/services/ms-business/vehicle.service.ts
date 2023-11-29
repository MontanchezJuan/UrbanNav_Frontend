import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError, of, tap } from 'rxjs';

import { environments } from '../../../../environments/environments';
import {
  VehicleResponse
} from '../../interfaces/ms-business/vehicle.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private ms_business = environments.ms_business;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<VehicleResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<VehicleResponse>(`${this.ms_business}/vehicles`, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  // show(id: string): Observable<ResponseOne> {
  //   if (!localStorage.getItem('token')) return of();

  //   const headers = this.authService.getHeaders();

  //   return this.http
  //     .get<ResponseOne>(`${this.ms_business}/vehicles/${id}`, {
  //       headers,
  //     })
  //     .pipe(catchError((error) => throwError(() => error.error.message)));
  // }

  // store(data: DataUserProfile): Observable<ResponseOne> {
  //   if (!localStorage.getItem('token')) return of();

  //   const headers = this.authService.getHeaders();

  //   return this.http
  //     .post<ResponseOne>(`${this.ms_business}/vehicles`, data, { headers })
  //     .pipe(
  //       catchError((error) => throwError(() => error.error.message)),
  //     );
  // }

  // update(data: DataUserProfile, id: string): Observable<ResponseOne> {
  //   if (!localStorage.getItem('token')) return of();

  //   const headers = this.authService.getHeaders();

  //   return this.http
  //     .put<ResponseOne>(`${this.ms_business}/vehicles/${id}`, data, { headers })
  //     .pipe(catchError((error) => throwError(() => error.error.message)));
  // }

  // destroy(id: string): Observable<ResponseOne> {
  //   if (!localStorage.getItem('token')) return of();

  //   const headers = this.authService.getHeaders();

  //   return this.http
  //     .delete<ResponseOne>(`${this.ms_business}/vehicles/${id}`, { headers })
  //     .pipe(catchError((error) => throwError(() => error.error.message)));
  // }
}
