import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Supply } from '../models/supply.model';
import { URL_SERVICES, URL_SUPPLIES } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class ApiSuppliesService {
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

    return this.http.get<any>(URL_SERVICES, { params });
  }

  // Método para obtener el total de suministros
  getTotalSupplies(): Observable<any> {
    return this.http.get<any>(`${URL_SUPPLIES}/total`);
  }

  // Método para obtener un suministro por ID
  public getSupplyById(id: string): Observable<Supply> {
    return this.http.get<Supply>(`${URL_SUPPLIES}/${id}`);
  }

  addSupply(activity: any): Observable<any> {
    return this.http
      .post<any>(URL_SUPPLIES, activity)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: any) {
    console.error('Request error:', error);
    return throwError(() => new Error('Error occurred, please try again.'));
  }
}
