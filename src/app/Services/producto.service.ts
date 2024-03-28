import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';
import { Producto } from '../Interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlApi:string = environment.endpoint + "producto/"

  constructor(private http:HttpClient) { }

  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}lista`)
  }

  guardar(request: Producto):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}guardar`,request)
  }

  editar(request: Producto):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}editar`,request)
  }

  eliminar(id:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${id}`)
  }
}
