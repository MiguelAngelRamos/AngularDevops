import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent } from '@core/models/IStudent';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly URL = environment.api; //* http://localhost:3000
  constructor(private http: HttpClient) { }

  //* alt + 96
  getAllUser$():Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${this.URL}/students`);
    //* `${this.URL}/usuarios` => http://localhost:3000/usuarios
  }

  //* Eliminar El Usuario
  deleteUser(id: number) {
    const URL = `${this.URL}/student/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.delete(URL, {headers}).pipe(map( resp => {
      Swal.fire(
        'Borrado!',
        'El usuario a sido elimado!',
        'success'
      )
      return true;
    }));
  }
}
