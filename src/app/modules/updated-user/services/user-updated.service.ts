import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { IUser } from '@core/models/IUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IStudent } from '@core/models/IStudent';

@Injectable({
  providedIn: 'root'
})
export class UserUpdatedService {

  private readonly URL = environment.api; //* localhost:3000

  constructor(private http: HttpClient) { }

  //* identificado al usuario queremos actualizar
  getUserById(id: number):Observable<IStudent> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // { headers: headers}  => { headers }
    return this.http.get<IStudent>(`${this.URL}/student/${id}`, {headers});
  }

  //* Actualizamos al usuario en el servidor
  //* el id del usuario queremos actualizar
  //* usuario: IStudent los nuevos datos actualizados a guardar en la BD (base de datos)
  updatedUser(id: number, usuario: IStudent) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.URL}/student/${id}`, usuario, { headers }).pipe(map( resp => {
      return true;
    }));
  }
}
