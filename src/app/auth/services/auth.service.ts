import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  sendCredentials(email: string, password: string): Observable<any> {
  
    const usuarioAlBackend = {
      email,
      password
    };
    return this.http.post(`${this.URL}/auth/login`, usuarioAlBackend);

  }
}
