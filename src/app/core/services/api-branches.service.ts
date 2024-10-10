import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Branch } from '@core/models/branch.model'; // Modelo de Sucursales

@Injectable({
  providedIn: 'root',
})
export class ApiBranchesService {
  private urlApi = 'http://localhost:3000/branchOffices'; // URL para sucursales

  constructor(private http: HttpClient) {}

  // Método para obtener sucursales con paginación
  getBranches(
    pageSize: number,
    startAfterBranchId?: number
  ): Observable<Branch[]> {
    let params = new HttpParams().set('pageSize', pageSize.toString());

    if (startAfterBranchId) {
      params = params.set('startAfterBranchId', startAfterBranchId.toString());
    }

    return this.http
      .get<Branch[]>(this.urlApi, { params })
      .pipe(catchError(this.handleError));
  }

  // Method to get the total number of branches
  getTotalBranches(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.urlApi}/total`);
  }

  // Método para obtener una sucursal por ID
  getBranchById(id: string): Observable<Branch> {
    return this.http
      .get<Branch>(`${this.urlApi}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Método para agregar una nueva sucursal
  addBranch(branch: Branch): Observable<Branch> {
    return this.http
      .post<Branch>(this.urlApi, branch)
      .pipe(catchError(this.handleError));
  }

  // Método para eliminar una sucursal
  deleteBranch(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.urlApi}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(
      () => new Error('Error en la solicitud, por favor intenta de nuevo.')
    );
  }
}
