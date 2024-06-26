import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';
import { Venta } from '../Interfaces/venta';
import { DetalleVenta } from '../Interfaces/detalle-venta';


@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private urlApi:string = environment.endpoint + "venta/"

  constructor(private http:HttpClient) { }
  registrar(request:Venta):Observable<ResponseApi>{
   
    
    return this.http.post<ResponseApi>(`${this.urlApi}registrar`,request)
  }

  historial(buscarPor:string, numeroVenta:string,fechaInicio:string, fechaFin:string):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}historial?buscarPor=${buscarPor}&numeroVenta=${numeroVenta}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
  }

  reporte(fechaInicio:string, fechaFin:string):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
  }
}
