import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiActivitiesService {
  private urlApi = 'http://localhost:3000/activities'; // Ruta correcta para actividades

  constructor(private http: HttpClient) {}

  // Método para obtener actividades con paginación
  getActivities(
    pageSize: number,
    startAfterActivityId?: number
  ): Observable<any> {
    let params = new HttpParams().set('pageSize', pageSize.toString());

    if (startAfterActivityId) {
      params = params.set(
        'startAfterActivityId',
        startAfterActivityId.toString()
      );
    }

    return this.http.get<any>(this.urlApi, { params });
  }

  // Método para obtener el total de actividades
  getTotalActivities(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/total`);
  }

  // Método para obtener una actividad por ID
  public getActivityById(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/${id}`);
  }
}
