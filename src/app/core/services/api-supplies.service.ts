import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supply } from '../models/supply.model';

@Injectable({
  providedIn: 'root',
})
export class ApiSuppliesService {
  private urlApi = 'http://localhost:3000/supplies'; // Ruta correcta para suministros

  constructor(private http: HttpClient) {}

  // Método para obtener suministros con paginación
  getSupplies(
    pageSize: number,
    startAfterSupplyNumber?: number
  ): Observable<any> {
    let params = new HttpParams().set('pageSize', pageSize.toString());

    if (startAfterSupplyNumber) {
      params = params.set(
        'startAfterSupplyNumber',
        startAfterSupplyNumber.toString()
      );
    }

    return this.http.get<any>(this.urlApi, { params });
  }

  // Método para obtener el total de suministros
  getTotalSupplies(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/total`);
  }

  // Método para obtener un suministro por ID
  public getSupplyById(id: string): Observable<Supply> {
    return this.http.get<Supply>(`${this.urlApi}/${id}`);
  }
}
