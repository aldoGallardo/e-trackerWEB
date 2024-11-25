import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Branch } from '@core/models/branch.model'; // Modelo de Sucursales
import { URL_BRANCHES } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class ApiBranchesService {
  constructor(private http: HttpClient) {}

  // Método para obtener sucursales con soporte para paginación opcional
  getBranches(
    pageSize?: number,
    startAfterBranchId?: string
  ): Observable<Branch[]> {
    let params = new HttpParams();

    // Agregar parámetros opcionales solo si se proporcionan
    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (startAfterBranchId) {
      params = params.set('startAfterBranchId', startAfterBranchId);
    }

    return this.http.get<Branch[]>(URL_BRANCHES, { params }).pipe(
      map((branches) => {
        console.log('Sucursales desde API:', branches); // Debug
        return branches;
      }),
      catchError(this.handleError)
    );
  }

  // Método para obtener el total de sucursales
  getTotalBranches(): Observable<{ total: number }> {
    return this.http
      .get<{ total: number }>(`${URL_BRANCHES}/total`)
      .pipe(catchError(this.handleError));
  }

  // Método para obtener una sucursal por ID
  getBranchById(id: string): Observable<Branch> {
    return this.http
      .get<Branch>(`${URL_BRANCHES}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Método para agregar una nueva sucursal
  addBranch(branch: Branch): Observable<Branch> {
    return this.http
      .post<Branch>(URL_BRANCHES, branch)
      .pipe(catchError(this.handleError));
  }

  // Método para eliminar una sucursal
  deleteBranch(id: number): Observable<void> {
    return this.http
      .delete<void>(`${URL_BRANCHES}/${id}`)
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
