import { Injectable } from '@angular/core';

import{HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private urlApi:string = environment.endpoint + "menu/"
  constructor(private http:HttpClient) { }

  lista(idUsuario:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}lista?idUsuario=${idUsuario}`)
  }

}
