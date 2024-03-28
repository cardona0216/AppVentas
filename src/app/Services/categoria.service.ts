import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi:string = environment.endpoint + "categoria/"
  constructor(private http:HttpClient) { } 

  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}lista}`)
  }
}
