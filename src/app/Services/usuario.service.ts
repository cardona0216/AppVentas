import { Injectable } from '@angular/core';

import{HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';
import { Login } from '../Interfaces/login';
import { Usuario } from '../Interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApi:string = environment.endpoint + "usuario/"
  constructor(private http:HttpClient) { }

  iniciarSesion(request: Login):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}iniciarSesion`,request)
  }

  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}lista`)
  }

  guardar(request: Usuario):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}guardar`,request)
  }

  editar(request: Usuario):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}editar`,request)
  }

  eliminar(id:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${id}`)
  }

}
