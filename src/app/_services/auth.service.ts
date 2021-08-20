import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<string> {

    //throw new Error('not implemented');

    return this.httpClient.post<string>('/auth', {
      email,
      password
    });
  }
}
