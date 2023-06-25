import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IStudent } from '@core/models/IStudent';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private baseUrl: string = environment.api;

  constructor(private http: HttpClient) {

  }

  createUser(student: IStudent) {
    //* alt + 96 ``
    return this.http.post(`${this.baseUrl}/student`, student)
  }

  // createUser(user: IUser):Observable<IUser> {
  //   //* alt + 96 ``
  //   console.log(user);
  //   return this.http.post<IUser>(`${this.baseUrl}/usuarios`, user);
  // }
}
