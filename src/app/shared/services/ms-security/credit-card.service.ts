import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private ms_security = environments.ms_security;

  constructor(private http: HttpClient) {}

  store(data: any): Observable<any> {
    return this.http.post<any>(`${this.ms_security}/security/sign-up`, data);
  }
}
