import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Branch } from '@core/models/branch.model';
import { ActivityType } from '@core/models/activityType.model';

@Injectable({
  providedIn: 'root',
})
export class ApiActivitiesService {
  private urlApi = 'http://localhost:3000/activities';
  private branchApi = 'http://localhost:3000/branchOffices';
  private activityTypeApi = 'http://localhost:3000/activityTypes';

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

  addActivity(activity: any): Observable<any> {
    return this.http
      .post<any>(this.urlApi, activity)
      .pipe(catchError(this.handleError));
  }

  // Método para buscar actividades por término
  searchActivities(term: string): Observable<any> {
    let params = new HttpParams().set('term', term);
    return this.http.get<any>(`${this.urlApi}/search`, { params });
  }

  getBranches(): Observable<Branch[]> {
    return this.http
      .get<Branch[]>(this.branchApi)
      .pipe(catchError(this.handleError));
  }

  getActivityTypes(): Observable<ActivityType[]> {
    return this.http
      .get<ActivityType[]>(this.activityTypeApi)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Request error:', error);
    return throwError(() => new Error('Error occurred, please try again.'));
  }
}
