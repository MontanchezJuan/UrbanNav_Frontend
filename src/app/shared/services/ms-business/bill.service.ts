import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import {
  BillData,
  BillResponse,
  BillResponseOne,
} from '../../interfaces/ms-business/bill.interface';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private ms_bussines = environments.ms_business;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  index(): Observable<BillResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<BillResponse>(`${this.ms_bussines}/bills`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  show(id: string): Observable<BillResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .get<BillResponseOne>(`${this.ms_bussines}/bills/${id}`, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  store(data: BillData): Observable<BillResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .post<BillResponseOne>(`${this.ms_bussines}/bills`, data, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  update(data: BillData, id: string): Observable<BillResponseOne> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();
    console.log('si estoy dentro');

    return this.http
      .put<BillResponseOne>(`${this.ms_bussines}/bills/${id}`, data, {
        headers,
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  destroy(id: string): Observable<BillResponse> {
    if (!localStorage.getItem('token')) return of();

    const headers = this.authService.getHeaders();

    return this.http
      .delete<BillResponse>(`${this.ms_bussines}/bills/${id}`, { headers })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
