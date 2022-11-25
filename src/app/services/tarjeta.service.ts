import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  private myAppUrl = 'https://localhost:44385/'; //Url de la API
  private myApiUrl = 'api/tarjeta/'; //Url de la API

  constructor(private http: HttpClient) {}

  //Se crea este metodo get de la API
  getListTarjetas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  //Eliminar tarjeta
  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  //Guardar nueva tarjeta
  saveTarjet(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  //Actualizar tarjeta
  updateTarjeta(id: number, tarjeta: any) {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }
}
