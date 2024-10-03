import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch.model'; // Modelo de Sucursales

@Injectable({
  providedIn: 'root',
})
export class ApiBranchesService {
  private urlApi = 'http://localhost:3000/branchOffices'; // Ruta correcta para sucursales

  constructor(private http: HttpClient) {}

  // Método para obtener sucursales con paginación
  getBranches(pageSize: number, startAfterBranchId?: number): Observable<any> {
    let params = new HttpParams().set('pageSize', pageSize.toString());

    if (startAfterBranchId) {
      params = params.set('startAfterBranchId', startAfterBranchId.toString());
    }

    return this.http.get<any>(this.urlApi, { params });
  }

  // Método para obtener el total de sucursales
  getTotalBranches(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/total`);
  }

  // Método para obtener una sucursal por ID
  public getBranchById(id: string): Observable<Branch> {
    return this.http.get<Branch>(`${this.urlApi}/${id}`);
  }
}
