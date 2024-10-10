import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiActivitiesService {
  private urlApi = 'http://localhost:3000/activities';

  constructor(private http: HttpClient) {}

  getActivities(
    pageSize: number,
    startAfterActivityNumber?: number
  ): Observable<any> {
    console.log(startAfterActivityNumber);
    let params = new HttpParams().set('pageSize', pageSize.toString());

    if (startAfterActivityNumber) {
      params = params.set(
        'startAfterActivityNumber',
        startAfterActivityNumber.toString()
      );
    }

    return this.http.get<any>(this.urlApi, { params });
  }

  getTotalActivities(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.urlApi}/total`);
  }

  public getActivityById(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/${id}`);
  }

  // Método para buscar actividades por término
  searchActivities(term: string): Observable<any> {
    let params = new HttpParams().set('term', term);
    return this.http.get<any>(`${this.urlApi}/search`, { params });
  }
}
